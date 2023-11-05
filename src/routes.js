import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword.js";
import Home from "./pages/home.js";
import AuthPage from "./pages/login.js";
import Register from "./pages/register.js";
import Profile from "./pages/profile.js";
import ItemList from "./pages/itemList.js";
import CoastList from "./pages/coastList.js";
import PropertiesPage from "./pages/properties.js";
import IdealPropertie from "./pages/idealPropertie.js";
import Calendar from "./pages/Calendar/index.js";
import NewItemList from "./pages/ItemListNew.js";
import SuggestionList from "./components/seggestion.js";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<AuthPage />}>  </Route>
                <Route path='/' element={<Home />}>  </Route>
                <Route path='/register' element={<Register />}>  </Route>
                <Route path='/resetPassword' element={<ResetPassword />}></Route>

                <Route path='/profile' element={<Profile/>}>  </Route>
                <Route path='/properties' element={<PropertiesPage />}>  </Route>
                <Route path='/ideal-propertie' element={<IdealPropertie />}>  </Route>
                <Route path='/item-list' element={<NewItemList />}> </Route>
                <Route path='/coast-list' element={<CoastList/>}> </Route>
                <Route path='/calendar' element={<Calendar/>}> </Route>
                <Route path='/suggestion' element={<SuggestionList/>}> </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas