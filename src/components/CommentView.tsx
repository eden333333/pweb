import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import { deleteComment } from '../api/commentApi';
import Comment from '../models/Comment'; // ייבוא מודל של תגובה
import User from '../models/User';
import './CommentView.css'
import EditComment from './EditComment';


const CommentView = ({ comment, signalCommentChange }: { comment: Comment, signalCommentChange: () => void }) => {

    const ctx = useContext(Context);
    const userId = ctx.user!._id;

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const user = comment.user as User;

    const deleteCommentHandler = async () => {
        await deleteComment(comment._id!, ctx.token!);
        signalCommentChange();
    }
    return (
        <div className="comment-view">
            <p>{comment.comment}</p>
            <div className='comment-actions'>
                <sub>{user.firstName + " " + user.lastName} </sub>

                {userId === user._id && <span className="link" onClick={() => setIsEdit(!isEdit)}> {isEdit ? 'CANCEL EDIT' : 'EDIT'} </span>}
                {userId === user._id && isEdit && <EditComment comment={comment} signalCommentChange={signalCommentChange} setIsEdit={setIsEdit} />}
                {userId === user._id && <span className="link" onClick={deleteCommentHandler}> DELETE </span>}
            </div>
        </div>
    );
};

export default CommentView;//  רק להציג את התגובות הקיימות
