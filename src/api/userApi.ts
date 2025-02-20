
import User from "../models/User";
import { serverPort, serverUrl } from "./serverApi";

// api/users
const userUrl = '/api/users';

export const updateUser = async (user: User): Promise<User> => {
    const url = `${serverUrl}:${serverPort}${userUrl}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
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