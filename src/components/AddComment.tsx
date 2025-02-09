import { ChangeEvent, FormEvent, useState } from "react";

type CommentData = {
    name: string;
    comment: string;
};

const AddComment = () => {
    const [data, setData] = useState<CommentData>({ name: '', comment: '' });

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setData({ ...data, [id]: value });
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(data);

        fetch('http://localhost:550/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((resp) => console.log(resp));
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" value={data.name} disabled required />
                
                <label htmlFor="comment">Comment</label>
                <textarea id="comment" placeholder="Your comment" value={data.comment} onChange={onChange} required />
                
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};
export default AddComment; // המטרה להציג טופס להוספת תגובה חדשה