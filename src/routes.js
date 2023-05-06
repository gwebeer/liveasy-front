import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/login.js";
import Home from "./pages/home.js";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<AuthPage />}>  </Route>
                <Route path='/' element={<Home />}>  </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas