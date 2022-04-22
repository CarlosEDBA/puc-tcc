import React, { useState, useEffect } from 'react'

export default function useRefresh() {
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    if (shouldRefresh) setShouldRefresh(false)
  }, [shouldRefresh])

  function refresh() {
    setShouldRefresh(true)
  }

  return [shouldRefresh, refresh]
}