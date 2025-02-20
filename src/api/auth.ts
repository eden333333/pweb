import User from "../models/User";
import { serverPort, serverUrl } from "./serverApi";
const authurl = '/api/auth';



export const registerUser = (user:User) => {
    const url = `${serverUrl}:${serverPort}${authurl}/register`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) => response.json())
    .then((resp) => console.log(resp));
} 
export const loginUser = async (email:string, password:string) : Promise<{user:User, token:string}> =>  {
    const url = `${serverUrl}:${serverPort}${authurl}/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    const loginResponse = await response.json();
        
    return loginResponse;
    
} 