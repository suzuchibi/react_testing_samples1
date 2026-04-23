import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useApp from '../useApp'

describe('useApp', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  it('should initialize count to 0', () => {
    const { result } = renderHook(() => useApp())

    expect(result.current.count).toBe(0)
    expect(consoleLogSpy).toHaveBeenCalledWith('App mounted')
    expect(consoleLogSpy).toHaveBeenCalledWith('count changed:', 0)
  })

  it('should increment count when increment is called', () => {
    const { result } = renderHook(() => useApp())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
    expect(consoleLogSpy).toHaveBeenCalledWith('count changed:', 1)
  })

  it('should increment count multiple times', () => {
    const { result } = renderHook(() => useApp())

    act(() => {
      result.current.increment()
    })
    act(() => {
      result.current.increment()
    })
    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(3)
    expect(consoleLogSpy).toHaveBeenCalledWith('count changed:', 1)
    expect(consoleLogSpy).toHaveBeenCalledWith('count changed:', 2)
    expect(consoleLogSpy).toHaveBeenCalledWith('count changed:', 3)
  })

  it('should not log mount message on re-renders', () => {
    const { rerender } = renderHook(() => useApp())

    rerender()

    expect(consoleLogSpy).toHaveBeenCalledTimes(2) // App mounted and count changed on initial, no additional on rerender
    expect(consoleLogSpy).toHaveBeenCalledWith('App mounted')
    expect(consoleLogSpy).toHaveBeenCalledWith('count changed:', 0)
  })
})
