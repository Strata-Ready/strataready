'use client'

import { useState } from 'react'

const LESSON_MAP: Record<number, { chapters: number[], label: string }> = {
  1:  { chapters: [1, 2],     label: 'Fundamentals of Law and the Real Estate Services Act' },
  2:  { chapters: [3],        label: 'Professionalism and Ethics' },
  3:  { chapters: [4, 5],     label: 'Estates and Interests in Land' },
  4:  { chapters: [6],        label: 'Professional Liability of Real Estate Licensees' },
  5:  { chapters: [7],        label: 'Residential and Commercial Tenancies' },
  6:  { chapters: [8],        label: 'The Law of Contract' },
  7:  { chapters: [9, 10],    label: 'Strata Management Contracts and the Law of Agency' },
  8:  { chapters: [11],       label: 'Effective Negotiations and Alternative Dispute Resolution' },
  9:  { chapters: [12],       label: 'Strata Properties (Condominiums) and Cooperatives' },
  10: { chapters: [13],       label: 'Overview of the Strata Property Act and Regulation' },
  11: { chapters: [14],       label: 'Sections' },
  12: { chapters: [15, 16],   label: 'Strata Meetings and Governance' },
  13: { chapters: [17],       label: 'Protection of Personal Information' },
  14: { chapters: [18],       label: 'Building Design and Construction' },
  15: { chapters: [19],       label: 'Controls, Maintenance and Energy Conservation' },
  16: { chapters: [20, 21],   label: 'Insurance, Risk, Security and Environmental Protection' },
  17: { chapters: [22],       label: 'Local Government Law' },
  18: { chapters: [23],       label: 'Accounting Fundamentals for Strata Management' },
  19: { chapters: [24],       label: 'Budgeting: The Operating Budget and Fund' },
  20: { chapters: [25],       label: 'Budgeting: The Contingency Reserve Fund' },
  21: { chapters: [26, 27],   label: 'Purchasing and Personnel Management' },
}

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')

  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [docType, setDocType] = useState<'chapter' | 'assignment' | 'data'>('chapter')
  const [lessonNumber, setLessonNumber] = useState(1)
  const [actName, setActName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [documents, setDocuments] = useState<any[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)

  async function authenticate() {
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })
    if (res.ok) {
      setAuthenticated(true)
      loadDocuments()
    } else {
      setAuthError('Invalid key')
    }
  }

  async function loadDocuments() {
    setLoadingDocs(true)
    const res = await fetch(`/api/admin/documents?key=${key}`)
    const data = await res.json()
    setDocuments(data.documents || [])
    setLoadingDocs(false)
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('docType', docType)
    formData.append('lessonNumber', String(lessonNumber))
    formData.append('actName', actName)
    formData.append('key', key)

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if (res.ok) {
      setMessage(`✓ ${data.message}`)
      setFile(null)
      loadDocuments()
    } else {
      setMessage(`✗ Error: ${data.error}`)
    }
    setUploading(false)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">StrataReady Admin</h1>
          <input
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={e => setKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && authenticate()}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 text-sm"
          />
          {authError && <p className="text-red-500 text-sm mb-3">{authError}</p>}
          <button
            onClick={authenticate}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Enter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base Admin</h1>
          <span className="text-sm text-green-600 font-medium">● Authenticated</span>
        </div>

        {/* Upload Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document type</label>
              <select
                value={docType}
                onChange={e => setDocType(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="chapter">Chapter</option>
                <option value="assignment">Assignment</option>
                <option value="data">Data / Act / Regulation</option>
              </select>
            </div>

            {docType !== 'data' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lesson number</label>
                <select
                  value={lessonNumber}
                  onChange={e => setLessonNumber(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {Object.entries(LESSON_MAP).map(([num, { label }]) => (
                    <option key={num} value={num}>
                      Lesson {num} — {label.slice(0, 40)}...
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document name</label>
                <input
                  type="text"
                  placeholder="e.g. BCSPA, RESA, PIPA"
                  value={actName}
                  onChange={e => setActName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">PDF file</label>
            <input
              type="file"
              accept=".pdf"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {message && (
            <p className={`text-sm mb-4 ${message.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading & extracting...' : 'Upload & Extract Text'}
          </button>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Knowledge Base Documents</h2>
            <button onClick={loadDocuments} className="text-sm text-blue-600 hover:underline">
              Refresh
            </button>
          </div>

          {loadingDocs ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : documents.length === 0 ? (
            <p className="text-sm text-gray-500">No documents uploaded yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">File</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Type</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Lesson</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Pages</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc: any) => (
                  <tr key={doc.id} className="border-b border-gray-100">
                    <td className="py-2 text-gray-900">{doc.file_name}</td>
                    <td className="py-2 text-gray-600">{doc.doc_type}</td>
                    <td className="py-2 text-gray-600">{doc.lesson_number || doc.act_name || '—'}</td>
                    <td className="py-2 text-gray-600">{doc.page_count || '—'}</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        doc.processed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {doc.processed ? 'Ready' : 'Processing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}