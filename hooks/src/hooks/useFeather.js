import React, { useEffect } from 'react'

export default function useFeather() {
  useEffect(() => {
    window.feather.replace()
  }, [])
}