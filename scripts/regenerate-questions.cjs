const { createClient } = require('@supabase/supabase-js')
const Anthropic = require('@anthropic-ai/sdk')
const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

async function getKBContent(sectionId) {
  const { data: section } = await supabase
    .from('sections')
    .select('number, title')
    .eq('id', sectionId)
    .single()

  // Legislation first (source of truth), then assignments, then chapters
  const { data: legislation } = await supabase
    .from('kb_documents')
    .select('extracted_text')
    .eq('doc_type', 'data')

  const { data: assignments } = await supabase
    .from('kb_documents')
    .select('extracted_text')
    .eq('doc_type', 'assignment')
    .or(`lesson_number.eq.${section.number},chapter_number.eq.${section.number}`)

  const { data: chapters } = await supabase
    .from('kb_documents')
    .select('extracted_text')
    .eq('doc_type', 'chapter')
    .or(`lesson_number.eq.${section.number},chapter_number.eq.${section.number}`)

  const legislationText = (legislation || []).map(d => d.extracted_text).join('\n\n').slice(0, 4000)
  const assignmentText = (assignments || []).map(d => d.extracted_text).join('\n\n').slice(0, 1500)
  const chapterText = (chapters || []).map(d => d.extracted_text).join('\n\n').slice(0, 500)

  const text = [
    '=== LEGISLATION (SOURCE OF TRUTH — takes precedence over all other material) ===',
    legislationText,
    '=== ASSIGNMENT QUESTIONS (style and format guide only) ===',
    assignmentText,
    '=== CHAPTER CONTENT (background context only) ===',
    chapterText,
  ].filter(Boolean).join('\n\n')

  return { section, text }
}

async function generateQuestions(sectionId) {
  const { section, text } = await getKBContent(sectionId)

  const prompt = `You are writing multiple choice exam questions for the BC Strata Management Licensing Exam.

You must write exactly 20 questions for the section: "${section.title}"

CRITICAL STYLE REQUIREMENTS — study these examples carefully:

Example 1 (scenario with named characters):
"Mike, Dave, John and Kevin are joint tenants of a very large condominium that they all occupy. Kevin suddenly dies in an unfortunate accident. In his will, Kevin leaves his interest in the property to his sisters, Sarah and Jennifer. Upon learning of Sarah's and Jennifer's intention to move into the condominium, Dave sells his interest in the condo to Fred, without the knowledge or consent of anyone else. When John and Mike learn of these events, they decide not to let Fred, Sarah or Jennifer onto the property, arguing that the entire tenancy now remains in their hands. Which of the following statements is/are TRUE?"

Example 2 (TRUE/FALSE evaluation):
"Which of the following statements about the British Columbia civil court system would be considered accurate?
A. The next step for a disappointed litigant in a small claims dispute would be to appeal the small claims court decision to the BC Court of Appeal.
B. A matter brought before the BC Court of Appeal will be settled by a decision delivered by the majority of the judges after they have listened again to all of the evidence.
C. A BC Supreme Court judge can only hear cases involving amounts over $35,000.
D. A litigant can bring their case no further than the BC Court of Appeal, unless leave to appeal to the Supreme Court of Canada is granted.
Options: A, B, C, and D are accurate / B and C only / C and D only / D only"

Example 3 (BEST description):
"Which of the following is the BEST description of the relationship between professionalism and ethics?"

Example 4 (could NOT / would NOT):
"Bert recently proposed a subdivision plan that was accepted by the approving officer. Bert is anxious to find out what may be required of him under subdivision bylaws. Which of the following requirements or regulations could NOT be imposed on a subdivider such as Bert?"

Example 5 (TRUE statement):
"Which of the following statements concerning government regulations of privately owned land is TRUE?"

QUESTION PATTERNS TO USE (vary these across your 20 questions — use each type multiple times):
1. RICH SCENARIO with named characters → long paragraph with specific facts, multiple parties, then "Which of the following statements is/are TRUE?" OR "Which of the following BEST describes X's obligation?"
2. EVALUATE STATEMENTS format → present 3-4 labeled statements (A. ... B. ... C. ... D. ...) within the scenario, then ask "Which of the following statements is/are TRUE?" with combination answer choices like: "A and C only" / "B and D only" / "A, B and C" / "All of the above" / "None of the above". Use this format for AT LEAST 5 of the 20 questions.
3. "Which of the following is the BEST description of..."
4. "Which of the following statements about [topic] is TRUE?" — test a single specific rule
5. "Which of the following could NOT / would NOT be valid under the Act?"
6. "Which of the following MUST / is REQUIRED to..." — test mandatory obligations
7. "Under the [Act], which of the following is correct regarding [specific situation]?"
8. Scenario → "What should [character] do?" — test procedural knowledge
9. Calculation scenario → strata fee, CRF contribution, depreciation calculation
10. Chronological/procedural → "What is the correct sequence of steps?" or "What must happen FIRST?"

QUESTION TYPE BALANCE — for each section of 20 questions:
- 8 questions: pure knowledge ("Which is TRUE/FALSE/NOT...") — no scenario needed, test whether the candidate knows the rule
- 8 questions: scenario-based ("Sarah is a strata manager... which of the following...") — test application of the rule
- 4 questions: calculation or procedural ("What is the correct strata fee... What must happen first...")
Never use scenarios for simple definitional questions — if the answer is a straight rule from the legislation, ask it directly.

DIFFICULTY CALIBRATION — aim for this mix per section:
- 6 questions: straightforward application of a clear rule (but distractors are still sophisticated)
- 8 questions: scenario requiring judgment about which rule applies
- 6 questions: genuinely hard — either calculation, combination TRUE/FALSE statements, or a scenario where two options seem equally correct but one is subtly wrong

ANSWER FORMAT:
- Always exactly 4 options: A, B, C, D
- Sometimes options are combinations of statements (e.g., "A and B only", "A, C, and D only")
- One correct answer only
- Distractors must be sophisticated and challenging — model them on real exam style:
  - Each wrong answer should be plausible enough that a student who hasn't studied carefully would choose it
  - Wrong answers should be wrong for a SPECIFIC technical or legal reason, not obviously wrong
  - Use these distractor techniques:
    * Almost-correct: right concept, wrong detail (e.g. wrong threshold, wrong timeframe, wrong vote type)
    * Reversal: describes the opposite of the correct rule
    * Related-but-wrong: correct in a different context or under a different section of the Act
    * Overly broad or overly narrow: correct concept but wrong scope
  - Never use obviously silly or irrelevant distractors
  - CRITICAL: All four options (A, B, C, D) must be DISTINCT — never repeat or near-repeat the same answer in two options. Each option must test a different misconception or legal principle
  - CRITICAL: Option text must never contradict itself mid-sentence. Never write an option that argues against itself (e.g. "Yes, because X — wait, this requires recalculation. No, because Y"). Each option must state ONE clear, unambiguous position
  - The correct answer should not be identifiable by process of elimination — all options should seem defensible to an unprepared student
- Use BC-specific names: use a WIDE variety of BC names across different cultural backgrounds. Never repeat the same name more than once per section. Use names like: James, Sarah, Michael, Linda, David, Jennifer, Robert, Emma, William, Olivia, Marcus, Priya, Wei, Hassan, Fatima, Ravi, Aisha, Stefan, Mei, Carlos, Ingrid, Kwame, Nadia, Tariq, Simran, Ethan, Aurora, Tanreet, Linh, Raul, Elena, Nathan, Diana — spread them out, never cluster Chen and Patel together repeatedly
- Reference specific BC legislation: Strata Property Act, RESA, PIPA, RTA, etc.
- Strata corporation names MUST follow BC real-world naming conventions: "BCS XXXX" or a descriptive name like "Lakeview Strata Corporation", "Mountainview Heights", "Cedar Ridge Strata", "Pinebrook Court" — NEVER use invented alphanumeric codes like "ABC1234" or "XYZ-5678"
- Ensure the scenario facts directly support the question being asked. The facts, the question stem, and the answer options must all be about the SAME legal topic. Do not set up a scenario about insurance, then ask about owner negligence, then give answers about maintenance obligations. Every element must be internally consistent. The facts and the question must be logically consistent — do not set up a scenario about topic X and then ask about topic Y.
- Do NOT reference specific court case names or citations (e.g. "Ocean Harvesters v. Quinlan"). Test the legal principle, not the case name. If a scenario is based on a legal concept from case law, present the facts and ask the user to identify the correct principle.
- Include specific section numbers occasionally (e.g., "under s.35 of the Strata Property Act")

SOURCE MATERIAL for this section:
${text || 'Use your knowledge of BC strata management law for this section.'}

Return a JSON array of exactly 20 questions. Each question must have:
{
  "question_text": "...",
  "option_a": "...",
  "option_b": "...",
  "option_c": "...",
  "option_d": "...",
  "correct_answer": "A" | "B" | "C" | "D",
  "explanation": "Option (X) is correct because [reason]. Option (A) is incorrect because [reason]. Option (B) is incorrect because [reason]..." etc.,
  "study_note": "A 2-3 sentence plain-language summary of the key concept or rule being tested, written as a teaching note. Should help the reader understand the underlying principle without quoting the legislation verbatim. Do NOT reference chapter names or numbers — refer only to the concepts and legislation itself. E.g. 'Under RESA, BCFSA has broad disciplinary powers over licensees. The maximum penalty for an individual licensee is $250,000, which is significantly higher than most people expect...'",
  "act_reference": "The specific Act, section or regulation this question is based on — e.g. 'Strata Property Act, s.35' or 'Real Estate Services Act, Part 4' or 'PIPA, s.7'",
  "difficulty": 2 | 3 (2 = moderate, 3 = hard)
}

Return ONLY the JSON array. No preamble, no markdown, no explanation.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = response.content.filter(b => b.type === 'text').map(b => b.text).join('').trim()
  const clean = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
  return JSON.parse(clean)
}

async function main() {
  const { data: sections } = await supabase.from('sections').select('id, number, title').order('number')

  // Get section number from args, or do all
  const targetSection = process.argv[2] ? parseInt(process.argv[2]) : null

  const toProcess = targetSection
    ? sections.filter(s => s.number === targetSection)
    : sections

  console.log(`Regenerating questions for ${toProcess.length} section(s)...\n`)

  for (const section of toProcess) {
    process.stdout.write(`Section ${section.number}: ${section.title}... `)

    try {
      let questions = null
      let attempts = 0
      while (!questions && attempts < 3) {
        attempts++
        try {
          questions = await generateQuestions(section.id)
        } catch (err) {
          if (attempts < 3) {
            process.stdout.write(`retry ${attempts}... `)
            await new Promise(r => setTimeout(r, 2000))
          } else {
            throw err
          }
        }
      }

      // Deactivate existing questions
      await supabase.from('questions').update({ is_active: false }).eq('section_id', section.id)

      // Insert new questions
      const rows = questions.map(q => ({
        section_id: section.id,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        distractor_explanations: q.explanation,
        act_reference: q.act_reference || null,
        study_note: q.study_note || null,
        difficulty: q.difficulty || 2,
        is_active: true,
      }))

      const { error } = await supabase.from('questions').insert(rows)
      if (error) {
        console.log(`DB ERROR: ${error.message}`)
      } else {
        console.log(`${questions.length} questions ✓`)
      }

      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      console.log(`ERROR: ${err.message}`)
    }
  }

  console.log('\nDone.')
}

main().catch(console.error)
