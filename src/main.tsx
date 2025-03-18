import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ContextProvider from './context/Context.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <ContextProvider>
      <App />
      </ContextProvider>
    </BrowserRouter>
)
