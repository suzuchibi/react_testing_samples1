import * as z from 'zod'

export const formSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: '名前（性）は必須入力です' })
    .max(10, { message: '名前（性）は10文字以下で入力してください' }),
  lastname: z
    .string()
    .min(1, { message: '名前（名）は必須入力です' })
    .max(10, { message: '名前（名）は10文字以下で入力してください' }),
  comment: z
    .string()
    .max(200, { message: 'コメントは200文字以下で入力してください' })
    .optional(),
})

export type FormData = z.infer<typeof formSchema>
