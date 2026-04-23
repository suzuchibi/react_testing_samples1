import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within, userEvent, waitFor } from 'storybook/test'
import Modal from '../modal'
import '../../../../styles/global.css'
import '../modal-scope.css'

/**
 * Components
 */
const BaseHtml = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <div>
      <h1>Modal Sample</h1>
      <p>sample text sample text sample text sample text sample text</p>
      <p>sample text sample text sample text sample text sample text</p>
      <button onClick={() => handleOpen()}>Modal Open</button>
    </div>
  )
}

// const StoryTemplate = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   return (
//     <>
//       <BaseHtml handleOpen={() => setIsOpen(true)} />
//       <Modal
//         isOpen={isOpen}
//         className="modal-scope"
//         onClose={() => setIsOpen(false)}
//       >
//         <h1>Modal Title</h1>
//         <p>サンプルテキストサンプルテキスト</p>
//       </Modal>
//     </>
//   )
// }
// const meta: Meta<typeof Modal> = {
//   title: 'Features/ModalScope',
//   component: StoryTemplate,
//   tags: ['autodocs'],
//   parameters: {
//     layout: 'centered',
//   },
// }

const meta: Meta<typeof Modal> = {
  title: 'Features/ModalScope',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(false)
      return (
        <>
          <BaseHtml handleOpen={() => setIsOpen(true)} />
          <Modal
            isOpen={isOpen}
            className="modal-scope"
            onClose={() => setIsOpen(false)}
          >
            <Story />
          </Modal>
        </>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: () => (
    <>
      <h1>Modal Title</h1>
      <p>サンプルテキストサンプルテキスト</p>
    </>
  ),
  play: async (context) => {
    const canvas = within(context.canvasElement)
    const body = within(document.body)

    expect(canvas.getByText('Modal Sample')).toBeInTheDocument()
    const modalTitle = body.getByText('Modal Title')
    expect(modalTitle).toBeInTheDocument()
    const dialog = modalTitle.closest('dialog')
    expect(dialog).not.toHaveAttribute('open')
    expect(dialog).toHaveStyle('opacity: 0')
  },
}

export const ClickAction: Story = {
  render: Default.render,
  play: async (context) => {
    const canvas = within(context.canvasElement)
    const body = within(document.body)

    expect(canvas.getByText('Modal Sample')).toBeInTheDocument()
    expect(body.getByText('Modal Title')).toBeInTheDocument()

    const modalTitle = body.getByText('Modal Title')
    const dialog = modalTitle.closest('dialog')
    expect(dialog).not.toHaveAttribute('open')
    expect(dialog).toHaveStyle('opacity: 0')

    const button = canvas.getByRole('button', { name: 'Modal Open' })
    await userEvent.click(button)
    await waitFor(() => {
      expect(dialog).toHaveAttribute('open')
      expect(dialog).toHaveStyle('opacity: 1')
    })
  },
}
