import { ChangeEvent, FormEvent, useState, useContext } from "react";

import './CreatePost.css'
import Post from "../models/Post";
import { createPost } from "../api/postApi";
import { Context } from "../context/Context";   
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
    const ctx = useContext(Context);
    const navigate = useNavigate();
    
    // if ! userId: ctx.user, navigate to homepage
    const [post, setPost] = useState<Post>({ creationDate: new Date().toISOString().split(".")[0], content: '', user: ctx.user?._id });
    const onChange = (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setPost({ ...post, [id]: value })      // ...data == {email:"...", pssword:"...", email="123"}

    }
 const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const createdPost =- await createPost(post, ctx.token!);
        navigate('/content')
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <input type="datetime-local" id="creationDate" placeholder="you post's title" value={post.creationDate} onChange={onChange} required/>
            <div className="post-field">
                <label htmlFor="content">Content</label>
                <textarea cols={60} rows={5} id="content" value={post.content} onChange={onChange} required></textarea>
            </div>
            <button type="submit">Create Post</button>
            <h2>{post.creationDate}</h2>
            <span>{post.content}</span>
        </form>
    )
}

export default CreatePost;