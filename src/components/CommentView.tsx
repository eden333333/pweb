import Comment from '../models/Comment'; // ייבוא מודל של תגובה


const CommentView = ({ comment }: { comment: Comment }) => {
   
    return (
        <div>
            <h4>{comment.name}</h4>
            <p>{comment.comment}</p>
        </div>
    );
};

export default CommentView;//  רק להציג את התגובות הקיימות
