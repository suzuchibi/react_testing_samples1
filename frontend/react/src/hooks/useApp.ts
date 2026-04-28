import { useState, useEffect, useRef } from 'react'

/**
 * A custom hook for managing app state.
 * @returns count: number, increment: () => void
 */
const useApp = () => {
  const mountRef = useRef(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (mountRef.current) return
    mountRef.current = true
    console.log('App mounted')
  }, [])

  useEffect(() => {
    console.log('count changed:', count)
  }, [count])

  return {
    count,
    increment: () => setCount((prev) => prev + 1),
  }
}

export default useApp
