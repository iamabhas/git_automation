import {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import axios from "axios"
import configVariables from "../../../config.ts";
import {RootState} from "@/redux/store.ts";
import {IProfileData} from "@/@types/interface/stateInterfaces.ts";
const {serverUrl}=configVariables
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar.tsx"
import ReposList from "@/components/appComponents/dashboardComponents/ReposList.tsx";

const DashboardComponent = () => {
    const token = useSelector((state:RootState)=>state.auth.githubAccessToken)
    const [profileData, setProfileData] = useState<IProfileData>({
        id: 0, username: "", fullName: "", avatar: "", githubUrl: "", publicRepos: 0, followers: 0, following: 0, email: ""
    })
    useEffect(() => {
    const fetchUserData = async ()=>{
    const response = await  axios.post(`${serverUrl}/api/profile`,{
        githubAccessToken: token,
    });
    console.log(response.data.data);
    setProfileData(response.data.data);
}

        fetchUserData()
    }, [token]);
    return (
        <main>
            <div className="profile-container flex flex-row  space-x-5 items-center m-5">
                <Avatar>
                    <AvatarImage src={profileData.avatar} alt={profileData.username}/>
                    <AvatarFallback>{profileData.username[0]}</AvatarFallback>
                </Avatar>
                <div>{profileData.fullName}
                    <a href={profileData.githubUrl} target="_blank">
                        (@{profileData.username})
                    </a>

                </div>

                <div>Repos ({profileData.publicRepos})</div>
                <div>Followers ({profileData.followers})</div>
                <div>Following ({profileData.following})</div>
            </div>
            <div className="repos-list">
                    <ReposList token={token}/>
            </div>
        </main>
    );
};

export default DashboardComponent;
