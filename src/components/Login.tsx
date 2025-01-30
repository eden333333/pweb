import { ChangeEvent, FormEvent, useState } from "react";

type LoginData ={
    email: string;
    password:string;
}
const Login = () => {
    const [data, setData] = useState<LoginData>({email:'', password:''});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setData({...data, [id]:value})      // ...data == {email:"...", pssword:"...", email="123"}

    }

    const onSubmit = (event: FormEvent ) => {
        //TODO send login
        event.preventDefault(); // לעצור את השליחה של הטופס
        console.log(data);

        fetch('http://localhost:550/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((resp) => console.log(resp))
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="your email" value={data.email} onChange={onChange} required/> 
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="your password" value={data.password} onChange={onChange}/>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    )
}




export default Login;