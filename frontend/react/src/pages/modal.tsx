import { useState } from 'react'
import ModalScope from '../components/features/modal-scope/modal'
import ModalHook from '../components/features/modal-scope/modal-refactored'

function ModalPage() {
  const [isModalScope, setIsModalScope] = useState(false)
  const [isModalHook, setIsModalHook] = useState(false)

  return (
    <>
      <main>
        <button type="button" onClick={() => setIsModalScope(true)}>
          Modal Ccope
        </button>
        <button type="button" onClick={() => setIsModalHook(true)}>
          Modal Hook
        </button>
        <p>
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
      </main>
      <ModalScope
        isOpen={isModalScope}
        className="modal-scope"
        onClose={() => setIsModalScope(false)}
      >
        <div>
          <p>This is a modal scope!</p>
          <label>
            <input type="text"></input>
          </label>
        </div>
      </ModalScope>
      <ModalHook
        isOpen={isModalHook}
        className="modal-scope"
        onClose={() => setIsModalHook(false)}
      >
        <div>
          <p>This is a modal hook!</p>
        </div>
      </ModalHook>
    </>
  )
}

export default ModalPage
