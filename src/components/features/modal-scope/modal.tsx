import {
  type ReactNode,
  type ComponentPropsWithRef,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { createPortal } from 'react-dom'
// import './modal.css'
import './modal-scope.css'
// import './modal.module.css'

interface Props extends ComponentPropsWithRef<'dialog'> {
  children: ReactNode
  isOpen: boolean
  isClose?: boolean
  isEscape?: boolean
  onClose: () => void
}

/**
 * モーダル createPortalを使用して、モーダルをbody直下にレンダリングする
 * @param {ReactNode} children モーダルの内容
 * @param {boolean} isOpen モーダルの開閉状態
 * @param {boolean} [isClose=true] 閉じるボタンの表示有無
 * @param {boolean} [isEscape=true] Escapeキーでモーダルを閉じるかどうか
 * @param {() => void} onClose モーダルを閉じる関数
 * @param {string} [className] モーダルのクラス名 ComponentPropsWithRefで定義されているため、dialog要素の属性を受け取ることができる
 * @returns
 */
function Modal({
  children,
  isOpen,
  isClose = true,
  isEscape = true,
  onClose,
  className,
}: Props) {
  const dialogScopeRef = useRef<HTMLDialogElement>(null)

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
    const dialog = dialogScopeRef.current
    if (!dialog) return
    dialog.addEventListener('keydown', handleEscape, false)
    return () => {
      dialog.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape])

  useEffect(() => {
    const dialog = dialogScopeRef.current
    if (!dialog) return
    if (isOpen) {
      if (dialog.hasAttribute('open')) return
      dialog.showModal()
    } else {
      if (!dialog.hasAttribute('open')) return
      dialog.close()
    }
  }, [isOpen])

  return (
    <>
      {createPortal(
        <dialog ref={dialogScopeRef} className={className}>
          <div className="body">
            {children}
            {isClose && (
              <button type="button" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </dialog>,
        document.body,
      )}
    </>
  )
}

export default Modal
