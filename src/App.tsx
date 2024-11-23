import './App.css'
import {Route, Routes} from "react-router-dom"
import {Campaign, Comments, Dashboard, SignUp, SignIn} from "./pages"

function App() {
  return <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/campaign" element={<Campaign />} />
    <Route path="/comments" element={<Comments />} />
  </Routes>
}

export default App
