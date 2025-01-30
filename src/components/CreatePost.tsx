import { ChangeEvent, useState } from "react";

import './CreatePost.css'

type Post = {
    title: string;
    content: string;
}
const CreatePost = () => {
    const [post, setPost] = useState<Post>({ title: '', content: '' });

    const onChange = (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setPost({ ...post, [id]: value })      // ...data == {email:"...", pssword:"...", email="123"}

    }


    return (
        <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="you post's title" value={post.title} onChange={onChange} />
            <div className="post-field">
                <label htmlFor="content">Content</label>
                <textarea cols={60} rows={5} id="content" value={post.content} onChange={onChange}></textarea>
            </div>
            <h2>{post.title}</h2>
            <span>{post.content}</span>
        </div>
    )
}

export default CreatePost;