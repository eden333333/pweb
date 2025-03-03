import {useState, useContext, ChangeEvent, FormEvent, useEffect} from 'react';
import { Context } from '../context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../models/Post';
import {updatePost, getPostById} from '../api/postApi';


const EditPost = () => {

    const ctx = useContext(Context);
    const navigate = useNavigate();
    const { postId } = useParams();
    
    
    const [post, setPost] = useState<Post>({ creationDate: new Date().toISOString().split(".")[0], content: '', user: ctx.user?._id });
    const onChange = (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setPost({ ...post, [id]: value })     

    }

    const getPost = async() => {
        const post = await getPostById(postId!,  ctx.token!);
        if(post){
            setPost(post);
        }else{
            alert('Post not found');
            navigate('/content')
        }
        
    }
 const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const createdPost = await updatePost(post, ctx.token!);
        navigate('/content')
    };

    useEffect( () => {
        getPost();
    }, []);

    return (
        <form onSubmit={onSubmit}>

            <div className="post-field">
                <label htmlFor="content">Content</label>
                <textarea cols={60} rows={5} id="content" value={post.content} onChange={onChange} required></textarea>
            </div>
            <h3>Creation date: {post.creationDate}</h3>
            <button type="submit">Update Post</button>
        </form>
    )
}

export default EditPost;