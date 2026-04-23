import { useEffect, useRef, useCallback } from 'react'

interface UseModalStyedProps {
  isOpen: boolean
  isEscape?: boolean
  onClose: () => void
}

/**
 * カスタムフック: モーダルの開閉とEscapeキーハンドリングを管理
 * @param {boolean} isOpen モーダルの開閉状態
 * @param {boolean} [isEscape=true] Escapeキーでモーダルを閉じるかどうか
 * @param {() => void} onClose モーダルを閉じる関数
 * @returns {React.RefObject<HTMLDialogElement>} モーダルのref
 */
export function useModalStyled({
  isOpen,
  isEscape = true,
  onClose,
}: UseModalStyedProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  /**
   * Escapeキーでモーダルを閉じる
   * @param event
   */
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!isEscape) {
          event.preventDefault()
          return
        }
        onClose()
      }
    },
    [isEscape, onClose],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.addEventListener('keydown', handleEscape, false)
    return () => {
      dialog.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape])

  useEffect(() => {
    if (!dialogRef.current) return
    if (isOpen) {
      if (dialogRef.current.hasAttribute('open')) return
      dialogRef.current.showModal()
    } else {
      if (!dialogRef.current.hasAttribute('open')) return
      dialogRef.current.classList.add('fadeout-motion')
      // アニメーションが終わった後にモーダルを閉じる
      setTimeout(() => {
        dialogRef.current?.close()
        dialogRef.current?.classList.remove('fadeout-motion')
      }, 500)
    }
  }, [isOpen])

  return dialogRef
}
