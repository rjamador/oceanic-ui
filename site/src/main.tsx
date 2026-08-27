import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from 'oceanic-ui'

import 'oceanic-ui/styles.css'
import './styles/landing.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)
