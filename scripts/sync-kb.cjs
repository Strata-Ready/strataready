const { createClient } = require('@supabase/supabase-js')
const PDFParser = require('pdf2json')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CHAPTER_TO_LESSON = {
  1:1,2:1,3:2,4:3,5:3,6:4,7:5,8:6,9:7,10:7,
  11:8,12:9,13:10,14:11,15:12,16:12,17:13,18:14,
  19:15,20:16,21:16,22:17,23:18,24:19,25:20,26:21,27:21
}

function detectFileInfo(fileName) {
  const name = fileName.toLowerCase()
  if (name.startsWith('chapter')) {
    const match = name.match(/chapter(\d+)/)
    if (match) {
      const n = parseInt(match[1])
      return { docType:'chapter', lessonNumber:CHAPTER_TO_LESSON[n]||null, chapterNumber:n, actName:null }
    }
  }
  if (name.startsWith('view assignment') || name.startsWith('assignment')) {
    const match = name.match(/(\d+)/)
    if (match) return { docType:'assignment', lessonNumber:parseInt(match[1]), chapterNumber:null, actName:null }
  }
  return { docType:'data', lessonNumber:null, chapterNumber:null, actName:fileName.replace('.pdf','').replace(/_/g,' ') }
}

function extractTextFromPdf2json(pdfData) {
  const pages = pdfData.Pages || []
  const textParts = []
  for (const page of pages) {
    for (const text of page.Texts || []) {
      for (const run of text.R || []) {
        try { textParts.push(decodeURIComponent(run.T)) } catch(e) { textParts.push(run.T) }
      }
    }
    textParts.push('\n')
  }
  return textParts.join(' ')
}

async function parsePDF(buffer) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser(null, 1)
    parser.on('pdfParser_dataReady', (data) => {
      const text = extractTextFromPdf2json(data)
      const pages = (data.Pages || []).length
      resolve({ text, pages })
    })
    parser.on('pdfParser_dataError', (err) => {
      reject(new Error(err.parserError))
    })
    parser.parseBuffer(buffer)
  })
}

async function processFile(filePath) {
  const fileName = filePath.split('/').pop()
  process.stdout.write(`${filePath} ... `)
  try {
    const { data, error } = await supabase.storage.from('knowledge-base').download(filePath)
    if (error || !data) { console.log(`FAILED: ${error?.message}`); return }
    const buffer = Buffer.from(await data.arrayBuffer())
    const { text, pages } = await parsePDF(buffer)
    const { docType, lessonNumber, chapterNumber, actName } = detectFileInfo(fileName)
    const { error: dbError } = await supabase.from('kb_documents').upsert({
      file_name: fileName, file_path: filePath, doc_type: docType,
      lesson_number: lessonNumber, chapter_number: chapterNumber, act_name: actName,
      extracted_text: text, page_count: pages, processed: true,
    }, { onConflict: 'file_path' })
    if (dbError) { console.log(`DB ERROR: ${dbError.message}`); return }
    console.log(`OK (${pages} pages)`)
  } catch(err) { console.log(`ERROR: ${err.message}`) }
}

async function main() {
  const folders = ['chapters','assignments','data']
  const allFiles = []
  for (const folder of folders) {
    const { data } = await supabase.storage.from('knowledge-base').list(folder)
    if (data) allFiles.push(...data.filter(f=>f.name!=='.emptyFolderPlaceholder').map(f=>`${folder}/${f.name}`))
  }
  console.log(`Found ${allFiles.length} files\n`)
  for (const f of allFiles) await processFile(f)
  console.log('\nDone.')
}

main().catch(console.error)