import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/login";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={ <AuthPage/> }>  </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas