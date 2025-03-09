import User from "./User";

 type Post = {
    _id?: string;
    content: string;
    creationDate: string;
    image?:File|string;
    user?: string|User
    likes: string[];
}
export default Post;    