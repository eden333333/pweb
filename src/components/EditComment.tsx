import { ChangeEvent, FormEvent, useState, useContext, useEffect } from "react";
import { updateComment, getCommentById } from "../api/commentApi";
import Comment from "../models/Comment";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";

import './AddComment.css'


const EditComment = ({signalCommentChange, comment:editComment, setIsEdit }: { signalCommentChange:()=>void, comment:Comment, setIsEdit:(b:boolean) => void }) => {
    const ctx = useContext(Context);
    // const {commentId} = useParams();
    const [comment, setComment] = useState<Comment>({ ...editComment});

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setComment({ ...comment, [id]: value });
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const newComment = await updateComment(comment, ctx.token!);
            signalCommentChange();
            setIsEdit(false);
            //setComment({ user: ctx.user!._id!, comment: '', createdAt: '', postId: '' })
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
    };

    // const getComment = async () => {
    //     const comment = await getCommentById(commentId!, ctx.token!)
    //     if(comment){
    //         setComment(comment)
    //     }
    // }


    return (
        <form onSubmit={onSubmit} className='add-comment'>
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" placeholder="Your comment" value={comment.comment} onChange={onChange} required />

            <button type="submit">Add Comment</button>
        </form>
    );
};
export default EditComment; // המטרה להציג טופס להוספת תגובה חדשה