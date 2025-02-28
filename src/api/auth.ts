import Response, {LoginResponse} from '../models/Response';
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

export const loginUser = async (email:string, password:string) : Promise<Response<LoginResponse>> =>  {
    const loginResponse: Response<LoginResponse> = {ok:true, message: '', data: undefined};
    const url = `${serverUrl}:${serverPort}${authurl}/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    if(response.ok === false){
        loginResponse.ok = false;
        loginResponse.message = 'Invalid email or password';    
        return loginResponse;
    }
    loginResponse.data = await response.json(); //{user:{...}, token: '...'}
        
    return loginResponse;
    
} 