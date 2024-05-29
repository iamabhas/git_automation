import {useState,useEffect} from 'react';
import { Button } from "../../ui/button"
import axios from "axios";
import configVariables from "@/config.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {IFilesList} from "@/@types/interface/stateInterfaces.ts";

const {serverUrl} = configVariables

const AutoReviewPrFiles = ({ setIsReviewDialogOpen,fetchFilesData,setFetchFilesData}) => {
    const [filesData,setFilesData]=useState<IFilesList[]>([])
    const [open,setOpen]=useState(false);
    const [currentFile,setCurrentFile]=useState("");
    const [currentReview,setCurrentReview]=useState("")
    useEffect(() => {
        const fetchFiles= async()=>{
            const response = await axios.post(`${serverUrl}/api/prs/fetch-pr-files`, {
                githubAccessToken:fetchFilesData.token,
                repo:fetchFilesData.repo,
                pullNumber:fetchFilesData.pullNumber
            })
            console.log(response.data.data.prFiles)
            setFilesData(response.data.data.prFiles)

        }
        fetchFiles()
    }, []);

    const generateFileReview =async (fileName:string)=>{
        setCurrentReview("")
        const response = await axios.post(`${serverUrl}/api/prs/generate-review`, {
            githubAccessToken:fetchFilesData.token,
            repo:fetchFilesData.repo,
            pullNumber:fetchFilesData.pullNumber,
            fileName:fileName
        })
        setCurrentReview(response.data.data.prReview)
    }

    const addReviewComment = async ()=>{
        try{
            const response = await axios.post(`${serverUrl}/api/prs/create-review-comment`, {
                githubAccessToken:fetchFilesData.token,
                repo:fetchFilesData.repo,
                pullNumber:fetchFilesData.pullNumber,
                fileName:currentFile,
                commitId:fetchFilesData.sha,
                comment:currentReview,
            })
            console.log(response.data)
            setOpen(false)
        }catch(err){
            console.log(err)
        }

    }

    return (
        <main>
            <h1 className="text-3xl ">
                Files for PR {fetchFilesData.pullNumber}
            </h1>
            <Button onClick={()=>{
                setIsReviewDialogOpen(false)
                setFetchFilesData({
                    repo:"",
                    pullNumber:0,
                    token:fetchFilesData.token,
                    sha:""
                })
            }}>Back</Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">File Name</TableHead>
                        <TableHead className="w-[200px]">Status</TableHead>
                        <TableHead className="w-[200px]">Changes</TableHead>
                        <TableHead className="w-[200px]">Additions</TableHead>
                        <TableHead className="w-[200px]">Deletions</TableHead>
                        <TableHead className="w-[200px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filesData.map((file,index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{file.filename}</TableCell>
                            <TableCell className="font-medium">{file.status}</TableCell>
                            <TableCell className="font-medium">{file.changes}</TableCell>
                            <TableCell className="font-medium">{file.additions}</TableCell>
                            <TableCell className="font-medium">{file.deletions}</TableCell>
                            <TableCell className="font-medium">
                                <Button onClick={()=>{
                                    setCurrentFile(file.filename)
                                    generateFileReview(file.filename)
                                    setOpen(true)

                                }}>Auto Generate Review</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Generate PR review</DialogTitle>
                        <DialogDescription>
                            <div>
                                {currentReview.length>0 ? `${currentReview}`:`Generating Review. Please wait...`}
                            </div>
                            <Button disabled={currentReview===""} className="m-5 " onClick={()=>{
                                generateFileReview(currentFile)
                            }}>Regenerate Review</Button>
                            <Button disabled={currentReview===""} className="m-5 " onClick={addReviewComment}>Add Review Comment</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            </main>
    );
};

export default AutoReviewPrFiles;
