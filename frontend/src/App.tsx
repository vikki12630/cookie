import { Route, Routes } from "react-router-dom"
import AppLayout from "./layout/AppLayout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<SignUp />}/>
      </Route>
    </Routes>
  )
}

export default App
