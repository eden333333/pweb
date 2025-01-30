import './PostList.css'
import Postview from './Postview';
const posts = [
    {id:1, content:'abc', creationDate: new Date(), user:{id:1, name:'moshe'}},
    {id:2, content:'asdfdsbc', creationDate: new Date(), user:{id:3, name:'Shaul'}},
    {id:3, content:'asdfds sdf\n sfdsabc', creationDate: new Date(), user:{id:2, name:'Avi'}},
    {id:4, content:'sdfds\'t sdfds\n', creationDate: new Date(), user:{id:1, name:'moshe'}},
    {id:5, content:'def', creationDate: new Date(), user:{id:1, name:'moshe'}},
]
const PostList = () => {
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