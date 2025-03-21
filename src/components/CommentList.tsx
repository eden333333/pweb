
import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import CommentView from "./CommentView";
import Comment from "../models/Comment";
import {getCommentsByPost} from "../api/commentApi";
import './CommentList.css'
import { useApi } from "../hooks/useApi";


type props = { postId: string, signalCommentChange:() =>void, change:number };
const CommentList = ({postId, signalCommentChange, change}:props) => {
    const ctx = useContext(Context);
    const [comments, setComments] = useState<Comment[]>([]);
    const {callServer, loading} = useApi<string, Comment[]>()

    const getComments = async () => {
        const response = await callServer({api:getCommentsByPost,modelData:postId},);
        const comments = response.data;
        if(comments){
            setComments(comments);
        }
    }
    // טעינת תגובות מהשרת
    useEffect(() => {
        getComments();
    }, [change]);


    return (
        <div className='comment-list'>
            <h4>Comments</h4>
            <ul>
                {comments.map((comment:Comment) => (
                    <CommentView key={comment._id} comment={comment} signalCommentChange={signalCommentChange} />
                ))}
            </ul>
            
       
        </div>
    );
};

export default CommentList;