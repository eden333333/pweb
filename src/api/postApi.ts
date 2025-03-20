import Post from "../models/Post";
import Response, { RawPromise } from "../models/Response";
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
export const createPost = async (post: Post, token: string): RawPromise => {
    const formData = new FormData();
    formData.append('content', post.content);
    formData.append('creationDate', post.creationDate);
    formData.append('user', post.user as string);
    if(post.image){
        console.log('added')
        formData.append('image', post.image as File);
    }
    const url = `${serverUrl}:${serverPort}${posturl}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
    //return await response.json(); // promise+[post...]
}

export const updatePost = async (post: Post, token: string): RawPromise=> {
    const formData = new FormData();
    const user = post.user as User;
    
    formData.append('content', post.content);
    formData.append('creationDate', post.creationDate);
    formData.append('user', user!._id!);
    if(post.image !== undefined){
        console.log('updated')
        if(post.image instanceof File){
            formData.append('image', post.image as File);
        }else{
            formData.append('image', post.image as string);
        }
    }
    
    const url = `${serverUrl}:${serverPort}${posturl}/${post._id}`;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: formData
    });
    //return await response.json();
};

// Promise<Response<LoginResponse>> 
export const getPosts = async (dummy: string, token: string): RawPromise => {
    const postsResponse: Response<Post[]> = {status:200, ok: true, message: '', data: undefined };
    const url = `${serverUrl}:${serverPort}${posturl}`;
    return fetch(url, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
};

export const getPostsByUser = async (userid: string, token: string): RawPromise => {
    const url = `${serverUrl}:${serverPort}${posturl}/?userid=${userid}`;
    return fetch(url, {
        headers: { 'authorization': `Bearer ${token}` }
    });
   // return await response.json(); //אולי נרצה לשנות 
};
export const getPostById = async (postId: string, token: string): RawPromise => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postId}`;   // http://127.0.0.0:5000/api/posts/475ry3ere
    return fetch(url, {
        headers: { 'authorization': `Bearer ${token}` }
    });
    
};
export const addLike = async (postId: string, token: string):RawPromise => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postId}/like`;   // http://127.0.0.0:5000/api/posts/475ry3ere
    return fetch(url, {
        headers: { 'authorization': `Bearer ${token}` },
        method: 'POST'
    });
   // return await response.json(); //אולי נרצה לשנות 
};
export const removeLike = async (postId: string, token: string): RawPromise => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postId}/like`;   // http://127.0.0.0:5000/api/posts/475ry3ere
    return fetch(url, {
        headers: { 'authorization': `Bearer ${token}` },
        method: 'DELETE'
    });
    //return await response.json(); //אולי נרצה לשנות 
};
export const deletePost = async (postid: string, token: string): RawPromise /*Promise<{ message: string }>*/ => {
    const url = `${serverUrl}:${serverPort}${posturl}/${postid}`;
    return fetch(url, {
        method: 'DELETE',
        headers: { 'authorization': `Bearer ${token}` }
    }
    );
    //return await response.json();
};

