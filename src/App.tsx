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
import { PostsPage } from "./new-app/pages/posts/Posts"
import CampaignSettings from "./new-app/pages/campaign-settings/CampaignSettings"
import { ProfilePage } from "./new-app/pages/profile/Profile"
import { SubscribePage } from "./new-app/pages/subscribe/Subscribe"
import ProspectsPage from "./new-app/pages/prospects/Prospects"
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
    <Route path="/campaign-settings" element={<CampaignSettings />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/subscribe" element={<SubscribePage />} />
    <Route path="/prospects" element={<ProspectsPage />} />
  </Routes>
}

export default App
