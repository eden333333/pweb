import Comment from "../models/Comment";
import { serverPort, serverUrl } from "./serverApi";
import Response, { RawPromise } from "../models/Response";

const commentUrl = '/api/comments';


export const createComment = (comment: Comment, token: string): RawPromise => {
    const url = `${serverUrl}:${serverPort}${commentUrl}`;
    return  fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(comment)
    });
   
};

export const updateComment = async (comment: Comment, token:string): RawPromise => {
    const url = `${serverUrl}:${serverPort}${commentUrl}/${comment._id}`;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(comment)
    });
    //return await response.json();
};

export const getComments = async (): RawPromise => {
    const url = `${serverUrl}:${serverPort}${commentUrl}`;
    return fetch(url);
    //return await response.json();
};

export const getCommentById = async (commentId:string, token: string): RawPromise => {
    const url = `${serverUrl}:${serverPort}${commentUrl}/${commentId}`;
    return fetch(url,{
        headers:{'authorization': `Bearer ${token}`}
    });
    //return await response.json();
};

export const getCommentsByPost = async (postId: string, token: string): RawPromise => {
    const url = `${serverUrl}:${serverPort}${commentUrl}/?postId=${postId}`;
    return fetch(url, {
        headers:{
            'authorization': `Bearer ${token}`
        }
    });
    //return await response.json();
};

export const getCommentsCountByPost = async (postId: string, token: string): RawPromise => { //Promise<{count:number}>
    const url = `${serverUrl}:${serverPort}${commentUrl}/?postId=${postId}&count=true`;
    return fetch(url, {
        headers:{
            'authorization': `Bearer ${token}`
        }
    });
    //return await response.json();
};

export const deleteComment = async (commentId: string, token: string): RawPromise /*Promise<{ message: string }>*/ => {
    const url = `${serverUrl}:${serverPort}${commentUrl}/${commentId}`;
    return fetch(url, { 
        method: 'DELETE',
        headers:{
            'authorization': `Bearer ${token}`
        }
    });
    //return await response.json();
};
