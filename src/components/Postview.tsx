import Post from "../models/Post";
import User from "../models/User";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

import './Postview.css'

type PostViewProps = {
    post: Post
}

const Postview = ({ post }: PostViewProps) => {
    const postUser = post.user as User;
    return (
        <div className="post-view">
            <h3>{post.content}</h3>
            <div className="created-by">
                <label>Created by</label>
                <span>{postUser.firstName + " " + postUser.lastName}</span>

            </div>
            <hr />
            <AddComment postId={post._id!} />
            <CommentList postId={post._id!} />
        </div>
    );

}
export default Postview;