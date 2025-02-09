import User from "./User";

 type Post = {
    id: number;
    content: string;
    creationDate: Date;
    user: User
}
export default Post;    