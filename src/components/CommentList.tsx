
import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import CommentView from "./CommentView";
import Comment from "../models/Comment";
import {getCommentsByPost} from "../api/commentApi";


type props = { postId: string };
const CommentList = ({postId}:props) => {
    const ctx = useContext(Context);
    const [comments, setComments] = useState<Comment[]>([]);

    const getComments = async () => {
        const comments = await getCommentsByPost(postId, ctx.token);
        if(comments){
            setComments(comments);
        }
    }
    // טעינת תגובות מהשרת
    useEffect(() => {
        getComments();
    }, []);


    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment:Comment) => (
                    <CommentView key={comment._id} comment={comment} />
                ))}
            </ul>
            
       
        </div>
    );
};

export default CommentList;