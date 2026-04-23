import { type ReactNode, type ComponentPropsWithRef } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '../../../hooks/useModal'
import './modal-scope.css'

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
  const dialogRef = useModal({ isOpen, isEscape, onClose })

  return (
    <>
      {createPortal(
        <dialog ref={dialogRef} className={className}>
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
