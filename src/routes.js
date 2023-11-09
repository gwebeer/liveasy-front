import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./admin/admin.js";
import SuggestionList from "./components/seggestion.js";
import NewItemList from "./pages/ItemListNew.js";
import ResetPassword from "./pages/ResetPassword.js";
import Calendar from "./pages/calendar.js";
import CoastList from "./pages/coastList.js";
import Home from "./pages/home.js";
import IdealPropertie from "./pages/idealPropertie.js";
import AuthPage from "./pages/login.js";
import NewPropertie from "./pages/newPropertie.js";
import Profile from "./pages/profile.js";
import PropertiesPage from "./pages/properties.js";
import Register from "./pages/register.js";


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
                <Route path='/new-propertie' element={<NewPropertie />}>  </Route>
                <Route path='/coast-list' element={<CoastList/>}> </Route>
                <Route path='/calendar' element={<Calendar/>}> </Route>
                <Route path='/suggestion' element={<SuggestionList/>}> </Route>
                <Route path='/admin' element={<App/>}> </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas