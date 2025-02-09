import Post from "../models/Post";
import AddComment from "./AddComment";


type PostViewProps = {
    post: Post
}

const Postview = ( { post}: PostViewProps) => {
    return (
        <div key={post.id}>
            <p>{post.content}</p>
            <label>Created by</label>
            <span>{post.user.firstName + " " + post.user.lastName}</span>
            <AddComment/>
        </div>
    );

}
export default Postview;