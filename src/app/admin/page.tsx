'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  const [documents, setDocuments] = useState<any[]>([])
  const [unprocessed, setUnprocessed] = useState<string[]>([])
  const [bucketTotal, setBucketTotal] = useState(0)
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState({ done: 0, total: 0, current: '' })
  const [activeTab, setActiveTab] = useState<'sync' | 'documents'>('sync')

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
    setUnprocessed(data.unprocessed || [])
    setBucketTotal(data.bucketTotal || 0)
    setLoadingDocs(false)
  }

  async function syncAll() {
    if (unprocessed.length === 0) return
    setSyncing(true)
    setSyncProgress({ done: 0, total: unprocessed.length, current: '' })

    const batchSize = 5
    let done = 0

    for (let i = 0; i < unprocessed.length; i += batchSize) {
      const batch = unprocessed.slice(i, i + batchSize)
      setSyncProgress({ done, total: unprocessed.length, current: batch[0] })

      await Promise.all(
        batch.map(filePath =>
          fetch(`/api/admin/upload?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath }),
          })
        )
      )

      done += batch.length
      setSyncProgress({ done, total: unprocessed.length, current: '' })
    }

    setSyncing(false)
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

  const pendingCount = unprocessed.length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Knowledge Base Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              {bucketTotal} files in bucket · {documents.length} processed · {pendingCount} pending
            </p>
          </div>
          <span className="text-sm text-green-600 font-medium">Authenticated</span>
        </div>

        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {(['sync', 'documents'] as const).map(tab => (
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
              {tab === 'sync' && pendingCount > 0 && (
                <span className="ml-2 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'sync' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Sync Knowledge Base</h2>
            <p className="text-sm text-gray-500 mb-6">
              Extracts text from all unprocessed PDFs in the storage bucket and saves to the database. Processes 5 files at a time.
            </p>

            {pendingCount === 0 && !syncing ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700 font-medium">All files are processed and ready.</p>
              </div>
            ) : (
              <>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 text-gray-600 font-medium">File</th>
                        <th className="text-left px-4 py-2 text-gray-600 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unprocessed.map((f, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="px-4 py-2 font-mono text-xs text-gray-700">{f}</td>
                          <td className="px-4 py-2">
                            {syncing && syncProgress.current === f ? (
                              <span className="text-blue-600 text-xs">Processing...</span>
                            ) : (
                              <span className="text-amber-600 text-xs">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {syncing && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{syncProgress.current || 'Processing...'}</span>
                      <span>{syncProgress.done}/{syncProgress.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${syncProgress.total > 0 ? (syncProgress.done / syncProgress.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={syncAll}
                  disabled={syncing}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {syncing
                    ? `Processing ${syncProgress.done} of ${syncProgress.total}...`
                    : `Process ${pendingCount} files`}
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Processed Documents</h2>
              <button onClick={loadDocuments} className="text-sm text-blue-600 hover:underline">
                Refresh
              </button>
            </div>

            {loadingDocs ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : documents.length === 0 ? (
              <p className="text-sm text-gray-500">No documents processed yet. Go to Sync tab.</p>
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
                      <td className="py-2 font-mono text-xs text-gray-900">{doc.file_name}</td>
                      <td className="py-2 text-gray-600">{doc.doc_type}</td>
                      <td className="py-2 text-gray-600">
                        {doc.lesson_number ? `Lesson ${doc.lesson_number}` : doc.act_name || '—'}
                      </td>
                      <td className="py-2 text-gray-600">{doc.page_count || '—'}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          doc.processed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {doc.processed ? 'Ready' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  )
}