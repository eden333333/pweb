export type User = {
    id: number;
    name: string;
}
export type PostType = {
    id: number;
    content: string;
    creationDate: Date;
    user: User
}
const Postview = (props: { post: PostType }) => {
    const post = props.post;
    return (
        <div key={post.id}>
            <p>{post.content}</p>
            <label>Created by</label>
            <span>{post.user.name}</span>
        </div>
    );

}
export default Postview;