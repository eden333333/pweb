import { useEffect, useState, useContext } from "react";
import PostList from "./PostList";
import Post from "../models/Post";
import {getPosts} from '../api/postApi';
import { Context } from "../context/Context";   
import { useNavigate } from "react-router-dom";
import User from "../models/User";

/*
    firstName: string,
    lastname: string,
    email: string,
    password: string,
*/

const ContentView = () => {
    const ctx = useContext(Context);
    const navigate = useNavigate();
    const [change, setChange] = useState<number>(0);
    const [view, setView] = useState<"all" | "my">("all");
    const [posts, setPosts] = useState<Post[]>([]);

    const signalChange = () => setChange((change + 1)%2);
    const filterPosts = () => {
        return view === "all" ? posts : posts.filter(post => (post.user as User)!._id! === ctx.user!._id!);
    }

    const getAllPosts = async () => {
        if(!ctx.token){
            navigate('/')
        }
        const response = await getPosts(ctx.token!);
        if(response.ok){
            setPosts(response.data!)
        }else{
            navigate('/login')
        }
    }
    useEffect( () => {
        getAllPosts();
    }, [change])
    useEffect( () => {

    }, [view])
    return (
        <div>
            <h2>Posts View</h2>
            <button style={{backgroundColor: view==="all"?"#99AABB":"initial"}} onClick={() => setView("all")}>All Posts</button>
            <button style={{backgroundColor: view==="my"?"#99AABB":"initial"}} onClick={() => setView("my")}>My Posts</button>

            <div>
              <PostList posts={filterPosts()} signalChange={signalChange}/>
            </div>
        </div>
    );
};

export default ContentView; // צריך להציג את רשימת הפוסטים