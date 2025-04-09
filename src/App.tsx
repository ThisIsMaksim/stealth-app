import {Route, Routes} from "react-router-dom"
import {Comments, SignUp, SignIn, Landing} from "./pages"
import {ConfirmedEmail} from "./pages/ConfirmEmail"
import {AudiencePage} from "./pages/Workspace/Audience"
import {AboutCompanyPage} from "./pages/Workspace/AboutCompany"
import {AboutYouPage} from "./pages/Workspace/AboutYou"
import {ToneOfVoicePage} from "./pages/Workspace/ToneOfVoice"
import {SettingsPage} from "./pages/Workspace/Settings"
import {StripePage} from "./pages/StripePage"
import {TermsOfUsePage} from "./pages/TermsOfUse"
import { Gateway } from "./pages/Gateway"
import { PostsPage } from "./pages/Posts"
import './App.css'

function App() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/app" element={<Gateway />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/workspace/audience" element={<AudiencePage />} />
    <Route path="/workspace/about-company" element={<AboutCompanyPage />} />
    <Route path="/workspace/about-you" element={<AboutYouPage />} />
    <Route path="/workspace/tone-of-voice" element={<ToneOfVoicePage />} />
    <Route path="/workspace/settings" element={<SettingsPage />} />
    <Route path="/comments" element={<Comments />} />
    <Route path="/confirm-email/:token" element={<ConfirmedEmail />} />
    <Route path="/payment" element={<StripePage />} />
    <Route path='/terms-of-use' element={<TermsOfUsePage />} />
    <Route path="/posts" element={<PostsPage />} />
  </Routes>
}

export default App
