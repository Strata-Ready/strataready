import { adminClient } from './supabase/admin'

export async function getDocumentText(lessonNumber: number, docType: 'chapter' | 'assignment' | 'data'): Promise<string> {
  const { data, error } = await adminClient
    .from('kb_documents')
    .select('extracted_text, file_name')
    .eq('lesson_number', lessonNumber)
    .eq('doc_type', docType)
    .not('extracted_text', 'is', null)

  if (error) throw new Error(`KB fetch error: ${error.message}`)
  if (!data || data.length === 0) throw new Error(`No ${docType} found for lesson ${lessonNumber}`)

  return data.map(d => `[Source: ${d.file_name}]\n${d.extracted_text}`).join('\n\n---\n\n')
}

export async function getAllActsText(): Promise<string> {
  const { data, error } = await adminClient
    .from('kb_documents')
    .select('extracted_text, file_name, act_name')
    .eq('doc_type', 'data')
    .not('extracted_text', 'is', null)

  if (error) throw new Error(`KB fetch error: ${error.message}`)
  if (!data || data.length === 0) return ''

  return data.map(d => `[Source: ${d.act_name || d.file_name}]\n${d.extracted_text}`).join('\n\n---\n\n')
}