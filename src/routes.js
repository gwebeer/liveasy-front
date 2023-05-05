import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/login";
import RegisterPage from "./pages/register";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<AuthPage />}>  </Route>
                <Route path='/register' element={<RegisterPage />}>  </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas