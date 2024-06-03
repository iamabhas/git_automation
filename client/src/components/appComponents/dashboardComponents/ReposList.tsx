import {useState,useEffect} from 'react';
import axios from "axios"
import configVariables from "@/config.ts";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../../ui/button"
import {Badge} from "../../ui/badge";
import {IReposList} from "@/@types/interface/stateInterfaces.ts";
import PullReviewsList from "@/components/appComponents/dashboardComponents/PullReviewsList.tsx";
const {serverUrl}=configVariables;

const ReposList = ({token}:{token:string|null}) => {
    const [repos, setRepos] = useState<IReposList[]>([]);
    const [prDialog, setPrDialog] = useState({
        isDialogOpen:false,
        repoName:"",
    });

    const propsData = {
        prDialogData :prDialog,
        setDialogData:setPrDialog,
        token:token
    }

    useEffect(() => {
        const fetchRepos = async()=>{
            const response = await axios.post(`${serverUrl}/api/repo/fetch-all`,{
                githubAccessToken: token,
            });
            const testRepo = response.data.data.filter((repo:IReposList)=>{
                return repo.repoName === "InternManagementSystem" || repo.repoName === "git_automation" || repo.repoName==="git_automation_test_repo"
            })
            setRepos(testRepo);
        }

        fetchRepos()
    }, [token]);

    return (
        <div className="m-5">
            {
                prDialog.isDialogOpen?<PullReviewsList {...propsData}/>:
                <Table>
                    <TableCaption>List of your Repositories</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Repo Name</TableHead>
                            <TableHead className="w-[200px]">Privacy</TableHead>
                            <TableHead className="w-[200px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {repos.map((repo) => (
                            <TableRow key={repo.id}>
                                <TableCell className="font-medium">{repo.repoName}</TableCell>
                                <TableCell className="font-medium">{repo.accessType?<Badge>Private</Badge>:<Badge>Public</Badge>}</TableCell>
                                <TableCell>
                                    <Button onClick={()=>{
                                        setPrDialog({
                                            isDialogOpen: true,
                                            repoName: repo.repoName
                                        })
                                    }}>View PR's</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }

        </div>
    );
};

export default ReposList;
