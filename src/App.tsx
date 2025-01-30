import {Route, Routes} from "react-router-dom"
import './App.css'
import {ML} from "./pages/ml.tsx"

function App() {
  return <Routes>
    <Route path="/" element={<ML />} />
  </Routes>
}

export default App
