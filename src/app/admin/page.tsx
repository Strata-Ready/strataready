'use client'

import { useState, useCallback } from 'react'

const CHAPTER_TO_LESSON: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 3, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 7,
  11: 8, 12: 9, 13: 10, 14: 11, 15: 12, 16: 12, 17: 13, 18: 14,
  19: 15, 20: 16, 21: 16, 22: 17, 23: 18, 24: 19, 25: 20, 26: 21, 27: 21
}

type FileStatus = {
  file: File
  name: string
  docType: string
  lessonNumber: number | null
  actName: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  message: string
}

function detectFileInfo(file: File): { docType: string; lessonNumber: number | null; actName: string } {
  const name = file.name.toLowerCase()

  if (name.startsWith('chapter')) {
    const match = name.match(/chapter(\d+)/)
    if (match) {
      const chapterNum = parseInt(match[1])
      const lessonNumber = CHAPTER_TO_LESSON[chapterNum] || null
      return { docType: 'chapter', lessonNumber, actName: '' }
    }
  }

  if (name.startsWith('view assignment') || name.startsWith('assignment')) {
    const match = name.match(/(\d+)/)
    if (match) {
      return { docType: 'assignment', lessonNumber: parseInt(match[1]), actName: '' }
    }
  }

  // Acts / regulations / data files
  const actName = file.name.replace('.pdf', '').replace(/_/g, ' ')
  return { docType: 'data', lessonNumber: null, actName }
}

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([])
  const [uploading, setUploading] = useState(false)
  const [documents, setDocuments] = useState<any[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'documents'>('upload')

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

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const statuses: FileStatus[] = files.map(file => {
      const { docType, lessonNumber, actName } = detectFileInfo(file)
      return {
        file,
        name: file.name,
        docType,
        lessonNumber,
        actName,
        status: 'pending',
        message: '',
      }
    })
    setFileStatuses(statuses)
  }

  async function uploadFile(fileStatus: FileStatus, index: number): Promise<void> {
    setFileStatuses(prev => prev.map((f, i) =>
      i === index ? { ...f, status: 'uploading' } : f
    ))

    const formData = new FormData()
    formData.append('file', fileStatus.file)
    formData.append('docType', fileStatus.docType)
    formData.append('lessonNumber', String(fileStatus.lessonNumber || 0))
    formData.append('actName', fileStatus.actName)
    formData.append('key', key)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      setFileStatuses(prev => prev.map((f, i) =>
        i === index ? {
          ...f,
          status: res.ok ? 'done' : 'error',
          message: res.ok ? data.message : data.error,
        } : f
      ))
    } catch (err) {
      setFileStatuses(prev => prev.map((f, i) =>
        i === index ? { ...f, status: 'error', message: 'Upload failed' } : f
      ))
    }
  }

  async function handleBulkUpload() {
    setUploading(true)
    // Upload sequentially to avoid overwhelming the server
    for (let i = 0; i < fileStatuses.length; i++) {
      if (fileStatuses[i].status === 'pending') {
        await uploadFile(fileStatuses[i], i)
      }
    }
    setUploading(false)
    loadDocuments()
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">StrataReady Admin</h1>
          <p className="text-sm text-gray-500 mb-6">Knowledge Base Management</p>
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

  const pendingCount = fileStatuses.filter(f => f.status === 'pending').length
  const doneCount = fileStatuses.filter(f => f.status === 'done').length
  const errorCount = fileStatuses.filter(f => f.status === 'error').length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Knowledge Base Admin</h1>
            <p className="text-sm text-gray-500 mt-1">{documents.length} documents in KB</p>
          </div>
          <span className="text-sm text-green-600 font-medium">● Authenticated</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {(['upload', 'documents'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'upload' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Bulk Upload</h2>
            <p className="text-sm text-gray-500 mb-4">