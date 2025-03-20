import { Link } from "react-router-dom";
import Post from "../models/Post";
import User from "../models/User";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { addLike, deletePost, removeLike } from "../api/postApi";
import './Postview.css'
import { getCommentsCountByPost } from "../api/commentApi";
import { imageUrl } from "../api/serverApi";
import { useApi } from "../hooks/useApi";

type PostViewProps = {
    post: Post;
    signalChange: () => void
}

const Postview = ({ post, signalChange }: PostViewProps) => {

    const ctx = useContext(Context);
    const userId = ctx.user!._id;
    const [commentCount, setCommentsCount] = useState<number>(0);
    const {callServer: callServerCount} = useApi<string, {count:number}>();
    const {callServer: callServerLike} = useApi<string, {}>();

    const postUser = post.user as User;
    const deletePostHandler = async () => {
        await deletePost(post._id!, ctx.token!);
        signalChange();
    }

   const getCommentsCount = async () => {
    
        const response = await callServerCount({api:getCommentsCountByPost, modelData:''}); //getCommentsCountByPost(post._id!, ctx.token);
        const commentsCount = response.data;
        if(commentsCount){
            setCommentsCount(commentsCount.count);
        }
    }
    const togglelike = async () => {
        if(post.likes.includes(userId!)){
            await callServerLike({api: removeLike, modelData:post._id!})
            // await removeLike(post._id!, ctx.token!);
        }else{
            await callServerLike({api: addLike, modelData:post._id!})
            // await addLike(post._id!, ctx.token!);
        }
        signalChange();

    } 



    useEffect(() => {
        getCommentsCount();
    }, [])
    if(!userId)return <div>loading, please wait</div>
    return (
        <div className="post-view">
            <h3>{post.content}</h3>
            <div className="created-by">
                <label>Created by</label>
                <span>{postUser.firstName + " " + postUser.lastName}</span>
                <span>{post.creationDate.split("T").join(" ")}</span>
            </div>
                {post.image && <img src={imageUrl+post.image as string} alt={post.content} />}
            <div className="actions">
                <Link to={`/content/posts/view/${post._id}`}>{commentCount}  COMMENTS</Link>
                {userId === postUser._id && <Link to={`/content/posts/${post._id}`}>EDIT</Link>}
                {userId === postUser._id && <span className="link" onClick={deletePostHandler}> DELETE</span>}
            <span onClick={togglelike}>
               {post.likes.includes(userId)?<span>&#9829;</span> :<span>&#9829;</span>} {post.likes.length} 
            </span>
            </div>
        </div>
    );

}
export default Postview;