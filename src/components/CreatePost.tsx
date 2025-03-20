import { ChangeEvent, FormEvent, useState, useContext } from "react";

import Post from "../models/Post";
import { createPost } from "../api/postApi";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import './CreatePost.css'
import { useApi } from "../hooks/useApi";


const CreatePost = () => {
    const ctx = useContext(Context);
    const navigate = useNavigate();

    // if ! userId: ctx.user, navigate to homepage
    const [post, setPost] = useState<Post>({ creationDate: new Date().toISOString().split(".")[0], content: '', user: ctx.user?._id, likes: [] });

    const {callServer, loading} = useApi<Post, Post>();
    
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setPost({ ...post, [id]: value })      // ...data == {email:"...", pssword:"...", email="123"}

    }
    const onInputFileCHange =  (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        console.log('updated image');
        
        setPost({ ...post, image:file});
    }
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await callServer({api:createPost, modelData:post}); //  createPost(post, ctx.token!);
        navigate('/content');
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Creation date</label>
            <input type="datetime-local" id="creationDate" placeholder="you post's title" value={post.creationDate} onChange={onChange} required />
            <div className="post-field">
                <label htmlFor="content">Content</label>
                <textarea cols={60} rows={5} id="content" value={post.content} onChange={onChange} required></textarea>
            </div>
            <div className="post-field">
                <label htmlFor="imageFile">Picture</label>
                <input type="file" id="imageFile" onChange={onInputFileCHange}  />
            </div>

            <button type="submit">Create Post</button>

        </form>
    )
}

export default CreatePost;