import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { createComment } from "../api/commentApi";
import Comment from "../models/Comment";
import { Context } from "../context/Context";

import './AddComment.css'


const AddComment = ({ postId, setChange, change }: { postId: string, setChange:(n:number)=>void, change:number }) => {
    const ctx = useContext(Context);
    const [data, setData] = useState<Comment>({ user: ctx.user!._id!, comment: '', createdAt: '', postId: postId });

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setData({ ...data, [id]: value });
    };
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const newComment = await createComment(data, ctx.token!);
            setChange((change+1)%2)
            setData({ user: ctx.user!._id!, comment: '', createdAt: '', postId: postId })
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
    };


    return (
        <form onSubmit={onSubmit} className='add-comment'>
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" cols={30} placeholder="Your comment" value={data.comment} onChange={onChange} required />

            <button type="submit">Add Comment</button>
        </form>
    );
};
export default AddComment; // המטרה להציג טופס להוספת תגובה חדשה