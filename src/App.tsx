import {Route, Routes} from "react-router-dom"
import {Comments, SignUp, SignIn, Landing} from "./pages"
import {ConfirmedEmail} from "./pages/ConfirmEmail"
import {AudiencePage} from "./pages/Workspace/Audience"
import {AboutCompanyPage} from "./pages/Workspace/AboutCompany"
import {AboutYouPage} from "./pages/Workspace/AboutYou"
import {ToneOfVoicePage} from "./pages/Workspace/ToneOfVoice"
import {SettingsPage} from "./pages/Workspace/Settings"
import {StripePage} from "./pages/StripePage"
import './App.css'

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
    <Route path="/payment" element={<StripePage />} />
  </Routes>
}

export default App
