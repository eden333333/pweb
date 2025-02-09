import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import User from "../models/User";



const Profile = () => {
    const [data, setData] = useState<User>({
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: '',
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);

    // טעינת הנתונים של המשתמש מהשרת
    useEffect(() => {
        fetch('http://localhost:550/profile')
            .then((response) => response.json())
            .then((userData) => setData(userData))
            .catch((error) => console.error("Error loading profile:", error));
    }, []);

    // עדכון הנתונים במצב עריכה
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData({ ...data, [id]: value });
    };

    // שליחת עדכון לשרת
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        
        fetch('http://localhost:550/profile/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((updatedData) => {
            setData(updatedData);
            setIsEditing(false); 
        })
        .catch((error) => console.error("Error updating profile:", error));
    };

    return (
        <div>
            <h1>Profile</h1>

            {!isEditing ? (
                <div>
                    <p><strong>First Name:</strong> {data.firstName}</p>
                    <p><strong>Last Name:</strong> {data.lastName}</p>
                    <p><strong>Birth Date:</strong> {data.birthDate}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            ) : (
                <form onSubmit={onSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" value={data.firstName} onChange={onChange} required />

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={data.lastName} onChange={onChange} required />

                    <label htmlFor="birthDate">Birth Date</label>
                    <input type="date" id="birthDate" value={data.birthDate} onChange={onChange} required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={data.email} onChange={onChange} required />

                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Profile;
