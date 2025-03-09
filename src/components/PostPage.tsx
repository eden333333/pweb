import { Link } from "react-router-dom";
import Post from "../models/Post";
import User from "../models/User";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { deletePost, getPostById } from "../api/postApi";
import './PostPage.css'
import { useParams } from "react-router-dom";


const PostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const ctx = useContext(Context);
    const userId = ctx.user!._id;
    const [change, setChange] = useState<number>(0);
    const [post, setPost] = useState<Post>();


    const deletePostHandler = async () => {
        await deletePost(post!._id!, ctx.token!);
    }
    const getPost = async () => {
        const post = await getPostById(postId!, ctx.token);
        setPost(post);
    }
    useEffect(() => {
        getPost();
    }, [])
    const signalCommentChange = () => setChange((change + 1) % 2);
    if (!post) return <div>Loading please wait</div>

    const postUser = post.user as User;
    return (
        <div className="post-page">
            <h3>{post.content}</h3>
            <div className="created-by">
                <label>Created by</label>
                <span>{postUser.firstName + " " + postUser.lastName}</span>
                <span>{post.creationDate.split("T").join(" ")}</span>
                {post.image && <img src={post.image as string} alt={post.content} />}
            </div>
            <div className="actions">
                {userId === postUser._id && <Link to={`/content/posts/${post._id}`}>EDIT</Link>}
                {userId === postUser._id && <span className="link" onClick={deletePostHandler}> DELETE</span>}
                <AddComment postId={post._id!} setChange={setChange} change={change} />
            </div>
                <CommentList postId={post._id!} signalCommentChange={signalCommentChange} change={change} />
        </div>
    );

}
export default PostPage;