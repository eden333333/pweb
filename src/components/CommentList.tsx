/* const CommentList = () => {
    return ( <div>
    <div>CommentList.tsx</div>
    <p>
        Cdeteals
    </p>
    <p>
        user
    </p>`
    </div>

    );



}
export default CommentList;
*/
import { useState, useEffect } from "react";

import CommentView from "./CommentView";
import Comment from "../models/Comment";


type props = { postId: string };
const CommentList = ({postId}:props) => {
    const [comments, setComments] = useState<Comment[]>([]);

    // טעינת תגובות מהשרת
    useEffect(() => {
        fetch("http://localhost:550/comments/"+postId)
            .then((response) => response.json())
            .then((data) => setComments(data))
            .catch((error) => console.error("Error fetching comments:", error));
    }, []);


    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment:Comment) => (
                    <CommentView key={comment.id} comment={comment} />
                ))}
            </ul>
            
       
        </div>
    );
};

export default CommentList;