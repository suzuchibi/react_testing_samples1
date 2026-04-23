import { type ReactNode, type ComponentPropsWithRef } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'
import { useModalStyled } from '../../../hooks/useModalStyled'

interface Props extends ComponentPropsWithRef<'dialog'> {
  children: ReactNode
  isOpen: boolean
  isClose?: boolean
  isEscape?: boolean
  onClose: () => void
}

const animationStyle = css`
  &[open],
  &[open]::backdrop {
    animation-name: fadeIn;
    animation-fill-mode: forwards;
    animation-duration: 500ms;
    animation-timing-function: ease-out;
  }
  &.fadeout-motion,
  &.fadeout-motion::backdrop {
    animation-name: fadeOut;
    animation-fill-mode: forwards;
    animation-duration: 500ms;
    animation-timing-function: ease-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

const StyledDialog = styled.dialog`
  background-color: transparent;
  border: none;
  padding: 1rem;

  ${animationStyle}

  .body {
    background-color: #fff;
    padding: 1rem;
    position: relative;

    button {
      cursor: pointer;
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
    }
  }
`

/**
 * モーダル createPortalを使用して、モーダルをbody直下にレンダリングする
 * @param {ReactNode} children モーダルの内容
 * @param {boolean} isOpen モーダルの開閉状態
 * @param {boolean} [isClose=true] 閉じるボタンの表示有無
 * @param {boolean} [isEscape=true] Escapeキーでモーダルを閉じるかどうか
 * @param {() => void} onClose モーダルを閉じる関数
 * @returns
 */
function ModalStyled({
  children,
  isOpen,
  isClose = true,
  isEscape = true,
  onClose,
}: Props) {
  const dialogRef = useModalStyled({ isOpen, isEscape, onClose })

  return (
    <>
      {createPortal(
        <StyledDialog ref={dialogRef}>
          <div className="body">
            {children}
            {isClose && (
              <button type="button" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </StyledDialog>,
        document.body,
      )}
    </>
  )
}

export default ModalStyled
