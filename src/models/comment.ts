
interface Comment { // מבנה נתונים לתגובה
    id?: string;
    postId: number;
    name: string;
    comment: string;
    createdAt: Date;
}
export default Comment; 