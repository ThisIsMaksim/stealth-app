import './App.css'
import {Route, Routes} from "react-router-dom"
import {Comments, SignUp, SignIn, Landing} from "./pages"
import {ConfirmedEmail} from "./pages/ConfirmEmail"
import {AudiencePage} from "./pages/Audience.tsx"
import {AboutCompanyPage} from "./pages/AboutCompany.tsx"
import {AboutYouPage} from "./pages/AboutYou.tsx"
import {ToneOfVoicePage} from "./pages/ToneOfVoice.tsx"
import {SettingsPage} from "./pages/Settings.tsx"

function App() {
  return <Routes>
    <Route path="/" element={<AudiencePage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/workspace/audience" element={<AudiencePage />} />
    <Route path="/workspace/about-company" element={<AboutCompanyPage />} />
    <Route path="/workspace/about-you" element={<AboutYouPage />} />
    <Route path="/workspace/tone-of-voice" element={<ToneOfVoicePage />} />
    <Route path="/workspace/settings" element={<SettingsPage />} />
    <Route path="/comments" element={<Comments />} />
    <Route path="/landing" element={<Landing />} />
    <Route path="/confirm-email/:token" element={<ConfirmedEmail />} />
  </Routes>
}

export default App
