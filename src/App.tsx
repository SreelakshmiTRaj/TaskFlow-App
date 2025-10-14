import "./index.css"
// import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/Auth/SignIn"
import SignUp from "./pages/Auth/SignUp"
const App = () => {
  return (
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/register' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
      
  )
}

export default App