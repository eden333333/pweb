import Post from "../models/Post";
import Response from "../models/Response";
import User from "../models/User";
import { serverPort, serverUrl } from "./serverApi";

const posturl = '/api/posts';

/*
  _id?: string;
    content: string;
    creationDate: string;
    image?:File|string;
    user?: string|User
    likes: string[];
*/
export const createPost = async (post: Post, token: string): Promise<Post> => {
    const formData = new FormData();
    formData.append('content', post.content);
    formData.append('creationDate', post.creationDate);
    formData.append('user', post.user as string);
    if(post.image){
        console.log('added')
        formData.append('image', post.image as File);
    }
    const url = `${serverUrl}:${serverPort}${posturl}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
    return await response.json(); // promise+[post...]
}

export const updatePost = async (post: Post, token: string): Promise<Post> => {
    const formData = new FormData();
    const user = post.user as User;
    
    formData.append('content', post.content);
    formData.append('creationDate', post.creationDate);
    formData.append('user', user!._id!);
    if(post.image){
        console.log('updated')
        formData.append('image', post.image as File);
    }
    
    const url = `${serverUrl}:${serverPort}${posturl}/${post._id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: formData
    });
    return await response.json();
};

// Promise<Response<LoginResponse>> 
export const getPosts = async (token: string): Promise<Response<Post[]>> => {
    const postsResponse: Response<Post[]> = { ok: true, message: '', data: undefined };
    const url = `${serverUrl}:${serverPort}${posturl}`;
    const response = await fetch(url, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        postsResponse.ok = false;
        return postsResponse;
    }
    postsResponse.data = await response.json();
    return postsResponse;
};

export const getPostsByUser = async (userid: string, token: string): Promise<Post[]> => {
    const url = `${serverUrl}:${serverPort}${posturl}/?userid=${userid}`;
    const response = await fetch(url, {
        headers: { 'authorization': `Bearer ${token}` }
    });
    return await response.json(); //אולי נרצה לשנות 
};
export const getPostById = async (postId: string, token: string): Promise<Post> => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postId}`;   // http://127.0.0.0:5000/api/posts/475ry3ere
    const response = await fetch(url, {
        headers: { 'authorization': `Bearer ${token}` }
    });
    return await response.json(); //אולי נרצה לשנות 
};
export const addLike = async (postId: string, token: string): Promise<Post> => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postId}/like`;   // http://127.0.0.0:5000/api/posts/475ry3ere
    const response = await fetch(url, {
        headers: { 'authorization': `Bearer ${token}` },
        method: 'POST'
    });
    return await response.json(); //אולי נרצה לשנות 
};
export const removeLike = async (postId: string, token: string): Promise<Post> => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postId}/like`;   // http://127.0.0.0:5000/api/posts/475ry3ere
    const response = await fetch(url, {
        headers: { 'authorization': `Bearer ${token}` },
        method: 'DELETE'
    });
    return await response.json(); //אולי נרצה לשנות 
};
export const deletePost = async (postid: string, token: string): Promise<{ message: string }> => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postid}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'authorization': `Bearer ${token}` }
    }
    );
    return await response.json();
};

