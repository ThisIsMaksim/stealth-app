import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import {ThemeProvider} from "./ThemeProvider"
import { NewApp } from './new-app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NewApp />
    </ThemeProvider>
  </StrictMode>,
)
