import {Route, Routes} from "react-router-dom"
import {Landing} from "./pages"
import {ConfirmedEmail} from "./new-app/pages/confirmed-email/ConfirmedEmail"
import {StripePage} from "./pages/StripePage"
import {TermsOfUsePage} from "./pages/TermsOfUse"
import {PostsPage} from "./new-app/pages/posts/Posts"
import CampaignSettings from "./new-app/pages/campaign-settings/CampaignSettings"
import { ProfilePage } from "./new-app/pages/profile/Profile"
import { SubscribePage } from "./new-app/pages/subscribe/Subscribe"
import ProspectsPage from "./new-app/pages/prospects/Prospects"
import { RedirectPage } from "./new-app/pages/redirect/Redirect"
import { Login } from "./new-app/pages/login/Login"
import { Registaration } from "./new-app/pages/registartion/Registration"
import { Page404 } from "./new-app/pages/404/404"
import './App.css'

function App() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/signup" element={<Registaration />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/workspace/audience" element={<RedirectPage href="/posts" />} />
    <Route path="/workspace/about-company" element={<RedirectPage href="/posts" />} />
    <Route path="/workspace/about-you" element={<RedirectPage href="/posts" />} />
    <Route path="/workspace/tone-of-voice" element={<RedirectPage href="/posts" />} />
    <Route path="/workspace/settings" element={<RedirectPage href="/posts" />} />
    <Route path="/comments" element={<RedirectPage href="/posts" />} />
    <Route path="/confirm-email/:token" element={<ConfirmedEmail />} />
    <Route path="/payment" element={<StripePage />} />
    <Route path='/terms-of-use' element={<TermsOfUsePage />} />
    <Route path="/posts" element={<PostsPage />} />
    <Route path="/campaign-settings" element={<CampaignSettings />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/subscribe" element={<SubscribePage />} />
    <Route path="/prospects" element={<ProspectsPage />} />
    <Route path="*" element={<Page404 />} />
  </Routes>
}

export default App
