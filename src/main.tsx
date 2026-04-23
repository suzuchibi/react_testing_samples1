import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Root from './pages/root.tsx'
import Modal from './pages/modal.tsx'
import ModalStyled from './pages/modal-styled.tsx'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/modal_styled" element={<ModalStyled />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
