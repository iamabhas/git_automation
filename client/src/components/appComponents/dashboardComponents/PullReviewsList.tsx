import {useState,useEffect} from "react"
import { Button } from "../../ui/button"
import configVariables from "@/config.ts";
import axios from "axios"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Badge} from "../../ui/badge";
import {IPrList} from "@/@types/interface/stateInterfaces.ts";
import AutoReviewPrFiles from "@/components/appComponents/dashboardComponents/AutoReviewPrFiles.tsx";
const {serverUrl}=configVariables;


const PullReviewsList = ({prDialogData,setDialogData,token}) => {
    const [prsList,setPrsList] = useState<IPrList[]>([])
    const [isReviewDialogOpen,setIsReviewDialogOpen] = useState(false)
    const [fetchFilesData,setFetchFilesData] = useState({
        repo:"",
        pullNumber:0,
        token:token,
        sha:""
    })
    const propsData = {
        isReviewDialogOpen,
        setIsReviewDialogOpen,
        fetchFilesData,setFetchFilesData
    }
    useEffect(() => {
        const fetchPrs =async ()=>{
            const response = await axios.post(`${serverUrl}/api/prs/fetch-prs`, {
                githubAccessToken : token,
                repo:prDialogData.repoName,
            })
            setPrsList(response.data.data.prs)
            console.log(response.data.data.prs)
        }
        fetchPrs()
    }, []);
    return (
        <main>
            {isReviewDialogOpen ? <AutoReviewPrFiles {...propsData} />: <div>
                <h1 className="text-3xl">List of Pull Reviews for Repo: {prDialogData.repoName}</h1>
                <Button onClick={() => {
                    setDialogData({
                        isDialogOpen: false,
                        repoName: ""
                    })
                }}>Back</Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[450px]">PR Number</TableHead>

                            <TableHead className="w-[450px]">PR Title</TableHead>
                            <TableHead className="w-[450px]">State</TableHead>
                            <TableHead
                                className="w-[450px]">About PR</TableHead>

                            <TableHead
                                className="w-[450px]">Base</TableHead>
                            <TableHead
                                className="w-[450px]">Head</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prsList.map((pr) => (
                            <TableRow key={pr.numberId}>
                                <TableCell className="font-medium">{pr.numberId}</TableCell>
                                <TableCell className="font-medium">{pr.prTitle}</TableCell>
                                <TableCell className="font-medium">{<Badge>{pr.state}</Badge>}</TableCell>
                                <TableCell className="font-medium">{pr.message}</TableCell>
                                <TableCell className="font-medium">Branch {pr.base.branch} (@{pr.base.user})</TableCell>
                                <TableCell className="font-medium">Branch {pr.head.branch} (@{pr.head.user})</TableCell>
                                <TableCell>
                                    <Button onClick={()=>{
                                        setIsReviewDialogOpen(true)
                                        setFetchFilesData({
                                            repo:prDialogData.repoName,
                                            pullNumber: pr.numberId,
                                            token:token,
                                            sha:pr.head.sha
                                        })
                                    }}>AI generated PR Review</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>}

        </main>
    );
};

export default PullReviewsList;
