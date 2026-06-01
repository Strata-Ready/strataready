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