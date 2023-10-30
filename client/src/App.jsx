import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateListing from "./pages/CreateListing"
import EditListing from "./pages/EditListing"

function App() {

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/sign-in" element={<SignIn/>} />
                <Route path="/sign-up" element={<SignUp/>} />
                <Route element={<PrivateRoute/>}>
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/create-listing" element={<CreateListing />} />
                    <Route path="/edit-listing/:id" element={<EditListing />} />
                </Route>
            </Routes>
        </>
    )
}
  
export default App
  