import ReactHookForm from '../components/features/react-hook-form/react-hook-form.tsx'
import styled from 'styled-components'

const Article = styled.article`
  width: min(100%, 480px);
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    text-align: center;
    line-height: 1.5em;
    margin: 0 0 2rem;
  }
`

function ReactHookFormPage() {
  return (
    <Article>
      <h1>React Hook Form</h1>
      <ReactHookForm />
    </Article>
  )
}

export default ReactHookFormPage
