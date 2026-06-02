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

  const { data: docs } = await supabase
    .from('kb_documents')
    .select('extracted_text')
    .or(`lesson_number.eq.${section.number},chapter_number.eq.${section.number}`)
    .limit(2)

  const text = (docs || []).map(d => d.extracted_text).join('\n\n').slice(0, 6000)
  return { section, text }
}

async function generateQuestions(sectionId) {
  const { section, text } = await getKBContent(sectionId)

  const prompt = `You are writing multiple choice exam questions for the BC Strata Management Licensing Exam administered by UBC Sauder School of Business.

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

QUESTION PATTERNS TO USE (vary these across your 20 questions):
1. Scenario with named BC characters → "Which of the following statements is/are TRUE?" with options like "A only", "B and C only", "None of the above"
2. "Which of the following is the BEST description of..."
3. "Which of the following statements about [topic] is TRUE?"
4. "Which of the following could NOT / would NOT..."
5. "Which of the following MUST / is REQUIRED to..."
6. "Under the [Act], which of the following is correct?"
7. Scenario → "What should [character] do?" or "What are [character]'s obligations?"

ANSWER FORMAT:
- Always exactly 4 options: A, B, C, D
- Sometimes options are combinations of statements (e.g., "A and B only", "A, C, and D only")
- One correct answer only
- Distractors must be plausible but wrong for a specific legal reason
- Use BC-specific names: use common BC names (Mike, Sarah, Dave, Linda, Chen, Patel, etc.)
- Reference specific BC legislation: Strata Property Act, RESA, PIPA, RTA, etc.
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
  "act_reference": "The specific Act, section or regulation this question is based on — e.g. 'Strata Property Act, s.35' or 'Real Estate Services Act, Part 4' or 'PIPA, s.7'",
  "difficulty": 2 | 3 (2 = moderate, 3 = hard)
}

Return ONLY the JSON array. No preamble, no markdown, no explanation.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8000,
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
      const questions = await generateQuestions(section.id)

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
