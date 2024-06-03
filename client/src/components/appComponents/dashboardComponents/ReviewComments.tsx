import {useState,useEffect} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import axios from "axios";
import configVariables from "@/config.ts";

const {serverUrl} = configVariables
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button.tsx";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
const ReviewComments = ({reviewsDialogOpen,setReviewsDialogOpen,githubAccessToken,repo,pullNumber}) => {
    const [comments,setComments]=useState([])


    useEffect(() => {
        const fetchReviews = async ()=>{
            try{
                const response = await axios.post(`${serverUrl}/api/prs/fetch-all-reviews`, {
                    githubAccessToken,
                    repo,
                    pullNumber
                })
                setComments(response.data.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchReviews()
    }, [githubAccessToken]);
    return (
        <Dialog open={reviewsDialogOpen} onOpenChange={setReviewsDialogOpen}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>List of Review Comments</DialogTitle>
                    <DialogDescription>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[1000px]">File Name</TableHead>
                                    <TableHead className="w-[1000px]">Review Comment</TableHead>
                                    <TableHead className="w-[1000px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {comments.map((comment,index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{comment.path}</TableCell>
                                        <TableCell className="font-medium">{comment.body}</TableCell>
                                        <TableCell className="font-medium">
                                            <Button variant="outline" className="m-1"><FiEdit/></Button>
                                            <Button variant="destructive" className="m-1"><MdDelete/></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewComments;
