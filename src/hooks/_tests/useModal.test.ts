import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useModal } from '../useModal'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('useModal', () => {
  let showModalMock: ReturnType<typeof vi.fn>
  let closeMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    showModalMock = vi.fn()
    closeMock = vi.fn()

    // HTMLDialogElement をモック
    HTMLDialogElement.prototype.showModal = showModalMock as any
    HTMLDialogElement.prototype.close = closeMock as any
  })

  function setup({ isOpen = false, isEscape = true, onClose = vi.fn() } = {}) {
    const initialOnClose = vi.fn()
    const { result, rerender, unmount } = renderHook(
      (props: any) => useModal(props),
      {
        initialProps: { isOpen, isEscape, onClose: initialOnClose },
      },
    )

    const dialog = document.createElement('dialog')
    act(() => {
      result.current.current = dialog
    })
    rerender({ isOpen, isEscape, onClose })

    return { result, rerender, unmount, dialog, onClose }
  }

  it('isOpen=true のとき showModal が呼ばれる', () => {
    const { rerender } = setup({ isOpen: false })

    rerender({ isOpen: true, isEscape: true, onClose: vi.fn() })

    expect(showModalMock).toHaveBeenCalled()
  })

  it('isOpen=false のとき close が呼ばれる', () => {
    const { dialog, rerender } = setup({ isOpen: true })

    dialog.setAttribute('open', '')

    rerender({ isOpen: false, isEscape: true, onClose: vi.fn() })

    expect(closeMock).toHaveBeenCalled()
  })

  it('Escapeキー押下で onClose が呼ばれる', () => {
    const onClose = vi.fn()
    const { dialog } = setup({ isOpen: true, isEscape: true, onClose })

    const event = new KeyboardEvent('keydown', { key: 'Escape' })

    act(() => {
      dialog.dispatchEvent(event)
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('isEscape=false のとき Escapeキーで閉じない', () => {
    const onClose = vi.fn()
    const { dialog } = setup({ isOpen: true, isEscape: false, onClose })

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    const preventDefault = vi.spyOn(event, 'preventDefault')

    act(() => {
      dialog.dispatchEvent(event)
    })

    expect(onClose).not.toHaveBeenCalled()
    expect(preventDefault).toHaveBeenCalled()
  })

  it('Escapeキー以外では onClose は呼ばれない', () => {
    const onClose = vi.fn()
    const { dialog } = setup({ isOpen: true, onClose })

    const event = new KeyboardEvent('keydown', { key: 'Enter' })

    act(() => {
      dialog.dispatchEvent(event)
    })

    expect(onClose).not.toHaveBeenCalled()
  })

  it('イベントリスナーがクリーンアップされる', () => {
    const onClose = vi.fn()
    const { unmount, dialog } = setup({ isOpen: true, onClose }) as any

    const removeSpy = vi.spyOn(dialog, 'removeEventListener')

    // unmount 相当
    unmount()

    expect(removeSpy).toHaveBeenCalled()
  })
})
