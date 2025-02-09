import Post from '../models/Post';
import './PostList.css'
import Postview from './Postview';

type PostListProps = {
    posts: Post[]
}
const PostList = ({posts}:PostListProps) => {
    return ( <div>
    <div>PostList</div>

    <div className="post-list">
    {
       posts.map(function(post){
        // return (<div key={post.id}> <p>{post.content}</p><label>Created by</label><span>{post.user.name}</span></div>)
        return <Postview key={post.id} post={post}/> 
       }) 
    }
    </div>

    <p>
        user
    </p>
    </div>

    );



}
export default PostList;