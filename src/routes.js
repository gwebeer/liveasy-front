import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/login.js";
import Home from "./pages/home.js";
import Register from "./pages/register.js";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<AuthPage />}>  </Route>
                <Route path='/' element={<Home />}>  </Route>
                <Route path='/register' element={<Register />}>  </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas