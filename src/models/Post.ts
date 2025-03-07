import User from "./User";

 type Post = {
    _id?: string;
    content: string;
    creationDate: string;
    user?: string|User
    likes: string[];
}
export default Post;    