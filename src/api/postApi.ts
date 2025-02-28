import Post from "../models/Post";
import  Response  from "../models/Response";
import { serverPort, serverUrl } from "./serverApi";

const posturl = '/api/posts';

export const createPost = async (post:Post, token:string): Promise<Post> => {
    const url = `${serverUrl}:${serverPort}${posturl}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    return await response.json(); // promise+[post...]
} 

export const updatePost = async (post: Post, token:string): Promise<Post> => {
    const url = `${serverUrl}:${serverPort}${posturl}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
    });
    return await response.json();
};

// Promise<Response<LoginResponse>> 
export const getPosts = async (token:string): Promise<Response<Post[]>>  => {
    const postsResponse: Response<Post[]> = {ok:true, message: '', data: undefined};
    const url = `${serverUrl}:${serverPort}${posturl}`;
    const response = await fetch(url, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
    if(!response.ok){
        postsResponse.ok = false;
        return postsResponse;
    }
    postsResponse.data = await response.json();
    return postsResponse;
};

export const getPostsByUser = async (userid: string): Promise<Post[]> => {
    const url = `${serverUrl}:${serverPort}${posturl}/?userid=${userid}`;
    const response = await fetch(url);
    return await response.json(); //אולי נרצה לשנות 
};

export const deletePost = async (postid: string): Promise<{ message: string }> => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postid}`;
    const response = await fetch(url, { method: 'DELETE' });
    return await response.json();
};