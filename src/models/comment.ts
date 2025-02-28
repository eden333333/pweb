import User from "./User";

interface Comment { // מבנה נתונים לתגובה
    _id?: string;
    postId: string;
    user: string|User;
    comment: string;
    createdAt: string;
}
export default Comment; 