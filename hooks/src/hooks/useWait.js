import React, { useState, useEffect } from 'react'

export default function useWait(ms) {
  const [waitComplete, setWaitComplete] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWaitComplete(true)
    }, ms)
  }, [])

  return waitComplete
}