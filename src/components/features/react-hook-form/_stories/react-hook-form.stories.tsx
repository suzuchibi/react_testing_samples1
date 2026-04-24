import type { Meta, StoryObj } from '@storybook/react'
import { expect, within, userEvent, waitFor } from 'storybook/test'
import ReactHookForm from '../react-hook-form.tsx'
import styled from 'styled-components'
import '../../../../styles/global.css'

const StoryTemplate = styled.div`
  padding: 2rem 1rem;
  h1 {
    text-align: center;
    line-height: 1.5em;
    margin: 0 0 2rem;
  }
`

const meta: Meta<typeof ReactHookForm> = {
  title: 'Features/ReactHookForm',
  component: ReactHookForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (story) => (
      <StoryTemplate>
        <h1>Form Sample</h1>
        {story()}
      </StoryTemplate>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ReactHookForm>

export const Default: Story = {
  name: '1. 初期状態',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 各フォームのプレースフォルダーを確認
    expect(canvas.getByPlaceholderText('名前（性）を入力')).toBeInTheDocument()
    expect(canvas.getByPlaceholderText('名前（名）を入力')).toBeInTheDocument()
    expect(canvas.getByPlaceholderText('コメントを入力')).toBeInTheDocument()

    // 初期状態ではエラーメッセージが表示されていないことを確認
    expect(
      canvas.queryByText('名前（性）は必須入力です'),
    ).not.toBeInTheDocument()
    expect(
      canvas.queryByText('名前（性）は10文字以下で入力してください'),
    ).not.toBeInTheDocument()
    expect(
      canvas.queryByText('名前（名）は必須入力です'),
    ).not.toBeInTheDocument()
    expect(
      canvas.queryByText('名前（名）は10文字以下で入力してください'),
    ).not.toBeInTheDocument()
    expect(
      canvas.queryByText('コメントは200文字以下で入力してください'),
    ).not.toBeInTheDocument()

    // aria-invalidがfalseである状態を確認する
    expect(canvas.getByLabelText('名前（性）')).toHaveAttribute(
      'aria-invalid',
      'false',
    )
    expect(canvas.getByLabelText('名前（名）')).toHaveAttribute(
      'aria-invalid',
      'false',
    )
    expect(canvas.getByLabelText('コメント')).toHaveAttribute(
      'aria-invalid',
      'false',
    )

    // 送信ボタンが存在している
    expect(canvas.getByRole('button', { name: '送信' })).toBeInTheDocument()
  },
}

export const FormActions: Story = {
  name: '2. フォーム操作',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 初期状態で送信ボタンをクリック
    const submitButton = canvas.getByRole('button', { name: '送信' })
    await userEvent.click(submitButton)

    // エラーメッセージが表示されることを確認
    expect(canvas.getByText('名前（性）は必須入力です')).toBeInTheDocument()
    expect(canvas.getByText('名前（名）は必須入力です')).toBeInTheDocument()

    // aria-invalidがtrueになることを確認
    expect(canvas.getByLabelText('名前（性）')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    expect(canvas.getByLabelText('名前（名）')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    expect(canvas.getByLabelText('コメント')).toHaveAttribute(
      'aria-invalid',
      'false',
    ) // commentはオプション

    // 有効なデータを入力
    const firstnameInput = canvas.getByLabelText('名前（性）')
    const lastnameInput = canvas.getByLabelText('名前（名）')
    const commentTextarea = canvas.getByLabelText('コメント')

    await userEvent.clear(firstnameInput)
    await userEvent.type(firstnameInput, '山田')
    await userEvent.clear(lastnameInput)
    await userEvent.type(lastnameInput, '太郎')
    await userEvent.clear(commentTextarea)
    await userEvent.type(commentTextarea, 'テストコメント')

    // エラーが消えることを確認
    await waitFor(() => {
      expect(
        canvas.queryByText('名前（性）は必須入力です'),
      ).not.toBeInTheDocument()
      expect(
        canvas.queryByText('名前（名）は必須入力です'),
      ).not.toBeInTheDocument()
    })

    // aria-invalidがfalseに戻ることを確認
    expect(canvas.getByLabelText('名前（性）')).toHaveAttribute(
      'aria-invalid',
      'false',
    )
    expect(canvas.getByLabelText('名前（名）')).toHaveAttribute(
      'aria-invalid',
      'false',
    )
    expect(canvas.getByLabelText('コメント')).toHaveAttribute(
      'aria-invalid',
      'false',
    )

    // 送信ボタンをクリック（成功）
    await userEvent.click(submitButton)

    // エラーがないことを確認（送信成功）
    expect(
      canvas.queryByText('名前（性）は必須入力です'),
    ).not.toBeInTheDocument()
    expect(
      canvas.queryByText('名前（名）は必須入力です'),
    ).not.toBeInTheDocument()
  },
}
