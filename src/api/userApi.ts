
import User from "../models/User";
import { serverPort, serverUrl } from "./serverApi";

// api/users
const userUrl = '/api/users';

export const updateUser = async (user: User, token:string): Promise<User> => {
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('birthDate', user.birthDate);
    formData.append('email', user.email);
    if(user.image){
        formData.append('image', user.image);
    }
    console.log(user);
    
    const url = `${serverUrl}:${serverPort}${userUrl}/${user._id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: formData
    });
    return await response.json();
};

export const getUsers = async (): Promise<User[]> => {
    const url = `${serverUrl}:${serverPort}${userUrl}`;
    const response = await fetch(url);
    return await response.json();
};

export const getUser = async (userId: string): Promise<User> => {
    const url = `${serverUrl}:${serverPort}${userUrl}/${userId}`;
    const response = await fetch(url);
    return await response.json();
};

export const deleteUser = async (userId: string): Promise<{ message: string }> => {
    const url = `${serverUrl}:${serverPort}${userUrl}/${userId}`;
    const response = await fetch(url, { method: "DELETE" });
    return await response.json();
};