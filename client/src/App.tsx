import {ModeToggle} from "@/components/mode-toggle.tsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from './pages/LoginPage.tsx';
import ErrorPage from "./pages/ErrorPage.tsx";
import DashboardPage from "../src/pages/DashboardPage.tsx";

const App = ()=> {
    return (
        <BrowserRouter>
            <div className="text-right">
                <div className="m-1"><ModeToggle  /></div>
            </div>

            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

