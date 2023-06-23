// React imports
import { useState, useEffect } from 'react';

interface IHistoryResponse {
  history: string[]
  setValue: (value: string) => void
  cleanHistory: () => void
}
export default function useHistory(): IHistoryResponse {
  const [history, setHistory] = useState<string[]>(() => {
    let currentValue: string[]

    try {
      currentValue = JSON.parse(localStorage.getItem('history') || '[]')
    } catch {
      currentValue = []
    }

    return currentValue
  })

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  function setValue(value: string): void {
    setHistory((prevState) => {
      const newHistory = [...prevState, value]
      return newHistory.slice(-10)
    })
  }

  function cleanHistory(): void {
    setHistory([])
  }

  return {
    history,
    setValue,
    cleanHistory
  }
}
