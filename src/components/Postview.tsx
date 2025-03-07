import { Link } from "react-router-dom";
import Post from "../models/Post";
import User from "../models/User";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { deletePost } from "../api/postApi";
import './Postview.css'
import { getCommentsCountByPost } from "../api/commentApi";

type PostViewProps = {
    post: Post;
    signalChange: () => void
}

const Postview = ({ post, signalChange }: PostViewProps) => {

    const ctx = useContext(Context);
    const userId = ctx.user!._id;
    const [commentCount, setCommentsCount] = useState<number>(0);

    const postUser = post.user as User;
    const deletePostHandler = async () => {
        await deletePost(post._id!, ctx.token!);
        signalChange();
    }

   const getCommentsCount = async () => {
        const commentsCount = await getCommentsCountByPost(post._id!, ctx.token);
        if(commentsCount){
            setCommentsCount(commentsCount.count);
        }
    }
    useEffect(() => {
        getCommentsCount();
    }, [])

    return (
        <div className="post-view">
            <h3>{post.content}</h3>
            <div className="created-by">
                <label>Created by</label>
                <span>{postUser.firstName + " " + postUser.lastName}</span>
                <span>{post.creationDate.split("T").join(" ")}</span>

            </div>
            <div className="actions">
                <Link to={`/content/posts/view/${post._id}`}>{commentCount}  COMMENTS</Link>
                {userId === postUser._id && <Link to={`/content/posts/${post._id}`}>EDIT</Link>}
                {userId === postUser._id && <span className="link" onClick={deletePostHandler}> DELETE</span>}
            </div>
        </div>
    );

}
export default Postview;