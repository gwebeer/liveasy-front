import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword.js";
import Home from "./pages/home.js";
import AuthPage from "./pages/login.js";
import Register from "./pages/register.js";
import Profile from "./pages/profile.js";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<AuthPage />}>  </Route>
                <Route path='/' element={<Home />}>  </Route>
                <Route path='/profile' element={<Profile/>}>  </Route>
                <Route path='/register' element={<Register />}>  </Route>
                <Route path='/resetPassword' element={<ResetPassword />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas