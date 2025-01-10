import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from "./ThemeProvider.tsx"
import {BrowserRouter} from "react-router-dom"
import {ToastWrapper} from "keep-react"
import {Modal} from "./components/Modal"
import {Onboarding} from "./components/Onboarding.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Onboarding>
          <App />
        </Onboarding>
        <ToastWrapper
          richColors={true}
          toastOptions={{
            classNames: {
              title: 'text-body-3 font-medium',
              toast: 'rounded-xl shadow-large',
              description: 'text-body-4 font-normal',
            },
          }}
        />
        <Modal />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
