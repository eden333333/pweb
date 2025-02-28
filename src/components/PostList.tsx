import { useEffect } from 'react';
import Post from '../models/Post';
import './PostList.css'
import Postview from './Postview';

type PostListProps = {
    posts: Post[]
}
const PostList = ({ posts }: PostListProps) => {
    useEffect( () =>{}, [posts])
    return (
        <div className="post-list">
            {
                posts.map(function (post) {
                    return <Postview key={post._id} post={post} />
                })
            }
        </div>
    );



}
export default PostList;