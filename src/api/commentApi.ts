import Comment from "../models/Comment";
import { serverPort, serverUrl } from "./serverApi";

const commentUrl = '/api/comments';

export const createComment = async (comment: Comment, token: string): Promise<Comment> => {
    const url = `${serverUrl}:${serverPort}${commentUrl}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(comment)
    });
    return await response.json();
};

export const updateComment = async (comment: Comment, token:string): Promise<Comment> => {
    const url = `${serverUrl}:${serverPort}${commentUrl}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(comment)
    });
    return await response.json();
};

export const getComments = async (): Promise<Comment[]> => {
    const url = `${serverUrl}:${serverPort}${commentUrl}`;
    const response = await fetch(url);
    return await response.json();
};

export const getCommentsByPost = async (postId: string, token: string): Promise<Comment[]> => {
    const url = `${serverUrl}:${serverPort}${commentUrl}/?postId=${postId}`;
    const response = await fetch(url, {
        headers:{
            'authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

export const deleteComment = async (commentId: string): Promise<{ message: string }> => {
    const url = `${serverUrl}:${serverPort}${commentUrl}/${commentId}`;
    const response = await fetch(url, { method: 'DELETE' });
    return await response.json();
};
