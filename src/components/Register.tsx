import { ChangeEvent, FormEvent, useState } from "react";
import User from "../models/User";



const Register = () => {
    const [data, setData] = useState<User>({
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: '',
    });

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        setData({ ...data, [id]: value });
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(data);

        fetch('http://localhost:550/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((resp) => console.log(resp));
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="Your first name" value={data.firstName} onChange={onChange} required />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Your last name" value={data.lastName} onChange={onChange} required />

                <label htmlFor="birthDate">Birth Date</label>
                <input type="date" id="birthDate" value={data.birthDate} onChange={onChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your email" value={data.email} onChange={onChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Your password" value={data.password} onChange={onChange} required />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;

// להוסיף שיהיה אפשר להירשם עם שם פרטי משפחה תאריך לידה מייל וסיסמא
// בדומה לתגובה
