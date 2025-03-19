import Post from "./Post";
import User from "./User";

export type LoginResponse = {
    user: User,
    token: string,
    refreshToken: string,
}
export type PostListResponse = {
    posts: Post[],
    
}
interface Response<T> {
    data: T|undefined;
    ok: boolean;
    message?: string;
    login?:boolean;
}
// לכל  ,שובה ליצור טיפוס ולשהש,מש בו ב,שובה
// כמו ב 
// login

export default Response;