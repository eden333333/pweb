
import User from "../models/User";
import { serverPort, serverUrl } from "./serverApi";
import { RawPromise } from "../models/Response";

// api/users
const userUrl = '/api/users';

export const updateUser = async (user: User, token:string): RawPromise => {
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('birthDate', user.birthDate);
    formData.append('email', user.email);
    if(user.image){
        formData.append('image', user.image);
    }
    
    const url = `${serverUrl}:${serverPort}${userUrl}/${user._id}`;
    return fetch(url, {
        method: "PUT",
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: formData
    });
    
};

export const getUsers = async (): RawPromise => {
    const url = `${serverUrl}:${serverPort}${userUrl}`;
    return fetch(url);
};

export const getUser = async (userId: string): RawPromise => {
    const url = `${serverUrl}:${serverPort}${userUrl}/${userId}`;
    return fetch(url);
    
};

export const deleteUser = async (userId: string): RawPromise /*Promise<{ message: string }>*/  => {
    const url = `${serverUrl}:${serverPort}${userUrl}/${userId}`;
    return fetch(url, { method: "DELETE" });

};