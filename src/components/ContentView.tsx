/*
const ContentView = () => {
    return ( <div>
    <div>Postview</div>
    <button>
        allpost
    </button>

    <button>
        mypost  
    </button>
    <div>
        listpost
    </div>
    <p>
        user
    </p>
    </div>

    );



}
export default ContentView;
*/

import { useState } from "react";
import PostList from "./PostList";
import Post from "../models/Post";

/*
    firstName: string,
    lastname: string,
    email: string,
    password: string,
*/
const dummyPosts:Post[] = [
    {id:1, content:'abc', creationDate: new Date(), user:{id:1, firstName:'moshe', lastName: 'Levi', email:'mlevi@mail.com', password:'12345'}},
    {id:2, content:'asdfdsbc', creationDate: new Date(), user:{id:3,firstName:'shaul', lastName: 'Levi', email:'shaul@mail.com', password:'12345'}},
    {id:3, content:'asdfds sdf\n sfdsabc', creationDate: new Date(), user:{id:2,firstName:'Avi', lastName: 'Levi', email:'avi@mail.com', password:'12345'}},
    {id:4, content:'sdfds\'t sdfds\n', creationDate: new Date(), user:{id:1, firstName:'moshe', lastName: 'Levi', email:'mlevi@mail.com', password:'12345'}},
    {id:5, content:'def', creationDate: new Date(), user:{id:1, firstName:'moshe', lastName: 'Levi', email:'mlevi@mail.com', password:'12345'}},
]

const ContentView = () => {
    const [view, setView] = useState<"all" | "my">("all");
    const [posts, setPosts] = useState<Post[]>(dummyPosts);

    const currentUser = {id:1, firstName:'moshe', lastName: 'Levi', email:'mlevi@mail.com', password:'12345'};

    const postsToShow = view === "all" ? posts : posts.filter(post => post.user.id === currentUser.id);

    return (
        <div>
            <h2>Post View</h2>
            <button onClick={() => setView("all")}>All Posts</button>
            <button onClick={() => setView("my")}>My Posts</button>
            <div>
                <h3>List of Posts</h3>
              <PostList posts={postsToShow}/>

            </div>
        </div>
    );
};

export default ContentView; // צריך להציג את רשימת הפוסטים