import DashboardComponent from "../components/appComponents/dashboardComponents/DashboardComponent.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
const DashboardPage = () => {
    const token = useSelector((state:RootState)=>state.auth.githubAccessToken)
    console.log('This is token',token)
    return (
        <>
            {token ? <div>
                    <h1 className="flex flex-row  justify-center items-center text-4xl">
                Welcome to Dashboard
            </h1>

                <div className="flex flex-row  justify-center items-center m-5">
                <DashboardComponent/>
                </div>
            </div>:
                <div className= "flex flex-row  justify-center items-center text-4xl">
                401 | Unauthorized . Please Log in
            </div>}
        </>

    );
};

export default DashboardPage;
