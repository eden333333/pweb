import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { loginUser } from '../api/auth';
import User from "../models/User";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

import './Login.css';

type LoginData = {
    email: string;
    password: string;
}
const Login = () => {
    const ctx = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState<LoginData>({ email: 'aaa@mail.com', password: '12345' });

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setData({ ...data, [id]: value })      // ...data == {email:"...", pssword:"...", email="123"}

    }

    const onSubmit = async (event: FormEvent) =>  {
        //TODO send login
        event.preventDefault(); // לעצור את השליחה של הטופס
        console.log(data);
        const loginResponse = await loginUser(data.email, data.password);
        if(loginResponse.ok){
            const {user, token} = loginResponse.data!;
            ctx.setAuth(user, token);
            navigate('/content');
        }else{
            alert(loginResponse.message);
        }
    }

    return (

        <form onSubmit={onSubmit} className='login-container'>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="your email" value={data.email} onChange={onChange} required />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="your password" value={data.password} onChange={onChange} />
            </div>
            <div className="field">
                <button type="submit">LOGIN</button>
            </div>
        </form>
    )
}
export default Login;