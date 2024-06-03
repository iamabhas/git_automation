import {ModeToggle} from "@/components/mode-toggle.tsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from './pages/LoginPage.tsx';
import ErrorPage from "./pages/ErrorPage.tsx";
import DashboardPage from "../src/pages/DashboardPage.tsx";
import {Button} from "@/components/ui/button.tsx";

const App = ()=> {
    return (
        <BrowserRouter>
            <div className="text-right flex flex-row justify-end">
                <div className="m-1"><ModeToggle  /></div>
                <Button className="m-1">Logout</Button>
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

