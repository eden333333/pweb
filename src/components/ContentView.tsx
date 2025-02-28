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
    const [view, setView] = useState<"all" | "my">("all");
    const [posts, setPosts] = useState<Post[]>([]);

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
    }, [])
    useEffect( () => {

    }, [view])
    return (
        <div>
            <h2>Posts View</h2>
            <button onClick={() => setView("all")}>All Posts</button>
            <button onClick={() => setView("my")}>My Posts</button>
            <p>{view}</p>
            <div>
              <PostList posts={filterPosts()}/>

            </div>
        </div>
    );
};

export default ContentView; // צריך להציג את רשימת הפוסטים