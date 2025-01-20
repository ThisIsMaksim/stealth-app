import './App.css'
import {Route, Routes} from "react-router-dom"
import {Campaign, Comments, SignUp, SignIn, Landing} from "./pages"

function App() {
  return <Routes>
    <Route path="/" element={<Campaign />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/campaign" element={<Campaign />} />
    <Route path="/comments" element={<Comments />} />
    <Route path="/landing" element={<Landing />} />
  </Routes>
}

export default App
