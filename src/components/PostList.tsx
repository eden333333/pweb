import { useEffect } from 'react';
import Post from '../models/Post';
import './PostList.css'
import Postview from './Postview';

type PostListProps = {
    posts: Post[];
    signalChange:() =>void

}
const PostList = ({ posts, signalChange }: PostListProps) => {
    useEffect( () =>{}, [posts])
    return (
        <div className="post-list">
            {
                posts.map(function (post) {
                    return <Postview key={post._id} post={post} signalChange={signalChange}/>
                })
            }
        </div>
    );



}
export default PostList;
