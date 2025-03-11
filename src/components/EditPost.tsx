import { useState, useContext, ChangeEvent, FormEvent, useEffect } from 'react';
import { Context } from '../context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../models/Post';
import { updatePost, getPostById } from '../api/postApi';
import './EditPost.css'
import { imageUrl } from '../api/serverApi';


const EditPost = () => {

    const ctx = useContext(Context);
    const navigate = useNavigate();
    const { postId } = useParams();


    const [removeImage, setRemoveImage] = useState<boolean>(false);
    const [post, setPost] = useState<Post>({ creationDate: new Date().toISOString().split(".")[0], content: '', user: ctx.user?._id, likes: [] });

    const onRemoveImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRemoveImage(event.target.checked);
        if (event.target.checked == true) {
            setPost({ ...post, image: '-' });
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setPost({ ...post, [id]: value })

    }
    const onInputFileCHange = (event: ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files![0];
        setPost({ ...post, image: file });
    }

    const getPost = async () => {
        const post = await getPostById(postId!, ctx.token!);
        if (post) {
            setPost(post);
        } else {
            alert('Post not found');
            navigate('/content')
        }

    }
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const createdPost = await updatePost(post, ctx.token!);
        navigate('/content')
    };
    const formatDate = (date: string) => {
        const dateArr = new Date(date).toLocaleString().split(':');
        dateArr.pop();// remove seconds
        return dateArr.join(':');
    }

    useEffect(() => {
        getPost();
    }, []);


    return (
        <form onSubmit={onSubmit} className='edit-post'>

            <div className="post-field">
                <label htmlFor="content">Content</label>
                <textarea cols={60} rows={5} id="content" value={post.content} onChange={onChange} required></textarea>
            </div>
            <div className="post-field">
                <label htmlFor="imageFile">Picture</label>
                <input type="file" id="imageFile" name="imageFile" onChange={onInputFileCHange} />
                <label htmlFor="removeImage">Remove Image</label>
                <input type="checkbox" name="" id="removeImage" value="" checked={removeImage} onChange={onRemoveImageChange} />
            </div>
            <div className="post-field">
            <h3>Creation date: {formatDate(post.creationDate)}</h3>
                <button type="submit">Update Post</button>
            </div>
            {post.image && (typeof(post.image) == 'string' )&& <img src={imageUrl + post.image as string} alt={post.content} />}
        </form>
    )
}

export default EditPost;