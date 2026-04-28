import { type ReactNode } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

const HeaderSample = styled.header`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <HeaderSample>
        <h1>Vite + React</h1>
      </HeaderSample>
      {children}
      <footer>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/modal">Modal</Link>
            </li>
            <li>
              <Link to="/modal_styled">Modal Styled</Link>
            </li>
            <li>
              <Link to="/react_hook_form">React Hook Form</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  )
}

export default Layout
