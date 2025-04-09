import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import App from './App.tsx'
import {ThemeProvider} from "./ThemeProvider"
import {BrowserRouter} from "react-router-dom"
import {ToastWrapper} from "keep-react"
import {Modal} from "./components/Modal"
import {Onboarding} from "./components/Onboarding"
import {ThemeProvider as GravityUIThemeProvider} from '@gravity-ui/uikit'
import {Toaster, ToasterComponent, ToasterProvider} from '@gravity-ui/uikit'

const toaster = new Toaster()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <GravityUIThemeProvider theme="light">
        <ToasterProvider toaster={toaster}>
          <BrowserRouter>
            <Onboarding>
              <App />
            </Onboarding>
            <ToastWrapper
              richColors={true}
              toastOptions={{
                classNames: {
                  title: 'text-body-3 font-medium',
                  toast: 'text-start rounded-xl shadow-large',
                  description: 'w-full text-body-4 font-normal',
                },
              }}
            />
            <ToasterComponent />
            <Modal />
          </BrowserRouter>
        </ToasterProvider>
      </GravityUIThemeProvider>
    </ThemeProvider>
  </StrictMode>,
)
