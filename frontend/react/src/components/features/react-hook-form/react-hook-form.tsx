import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FormData, formSchema } from './form-schema'

const StyledForm = styled.form`
  /* width: clamp(320px, 100%, 420px); */
  width: min(100%, 320px);
  display: block;
  margin: 0 auto;

  .section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1.25rem;

    > label {
      font-weight: bold;
    }

    > input[type='text'],
    > textarea {
      padding: 0.5rem;
      font-size: 1rem;
      letter-spacing: 0.05em;
      line-height: 1.5em;
    }

    > p.err {
      color: #ca2c00;
      font-size: 0.875rem;
    }
  }
`

function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const submintAction = (data: FormData) => {
    console.log(data)
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit(submintAction)}>
        <div className="section">
          <label htmlFor="firstname">名前（性）</label>
          <input
            id="firstname"
            type="text"
            placeholder="名前（性）を入力"
            {...register('firstname')}
            aria-invalid={errors.firstname ? 'true' : 'false'}
          />
          {errors.firstname && (
            <p role="alert" className="err">
              {errors.firstname.message}
            </p>
          )}
        </div>
        <div className="section">
          <label htmlFor="lastname">名前（名）</label>
          <input
            id="lastname"
            type="text"
            placeholder="名前（名）を入力"
            {...register('lastname')}
            aria-invalid={errors.lastname ? 'true' : 'false'}
          />
          {errors.lastname && (
            <p role="alert" className="err">
              {errors.lastname.message}
            </p>
          )}
        </div>
        <div className="section">
          <label htmlFor="comment">コメント</label>
          <textarea
            id="comment"
            placeholder="コメントを入力"
            {...register('comment')}
            aria-invalid={errors.comment ? 'true' : 'false'}
          />
        </div>
        {errors.comment && (
          <p role="alert" className="err">
            {errors.comment.message}
          </p>
        )}
        <button type="submit">送信</button>
      </StyledForm>
    </>
  )
}

export default ReactHookForm
