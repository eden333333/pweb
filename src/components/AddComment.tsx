import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { createComment } from "../api/commentApi";
import Comment from "../models/Comment";
import { Context } from "../context/Context";

import './AddComment.css'


const AddComment = ({ postId }: { postId: string }) => {
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
            console.log(newComment);
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
    };


    return (
        <form onSubmit={onSubmit} className='add-comment'>
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" placeholder="Your comment" value={data.comment} onChange={onChange} required />

            <button type="submit">Add Comment</button>
        </form>
    );
};
export default AddComment; // המטרה להציג טופס להוספת תגובה חדשה