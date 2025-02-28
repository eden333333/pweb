import User from "./User";

 type Post = {
    _id?: string;
    content: string;
    creationDate: string;
    user?: string|User
}
export default Post;    