import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import User from "../models/User";
import { updateUser } from "../api/userApi";
import { imageUrl } from "../api/serverApi";
import './Profile.css';
import { useApi } from "../hooks/useApi";


const defaultUser = {
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
}
const Profile = () => {
    const ctx = useContext(Context);
    const [data, setData] = useState<User>(ctx.user!);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const {callServer, loading} = useApi<User, User>()

    // טעינת הנתונים של המשתמש מהשרת
    useEffect(() => {
        if (ctx.user)
            setData(ctx.user);
    }, [ctx.user]);

    const onInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files![0];
        setData({ ...data, image: file });
    }

    // עדכון הנתונים במצב עריכה
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData({ ...data, [id]: value });
    };

    // שליחת עדכון לשרת
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response = callServer({api:updateUser, modelData:data})
        const updatedUser = (await response).data;
        if(updatedUser){

            ctx.setAuth(updatedUser, ctx.token, ctx.refreshToken);
            setData(updatedUser);
        }
        setIsEditing(false);
    };
    console.log(data);
    

    return (
        <div className='profile'>
            <h1>Profile</h1>

            {!isEditing ? (
                <div>
                    <div className="profile-view">
                        <div className="profile-data">
                            <p><strong>First Name:</strong> {data.firstName}</p>
                            <p><strong>Last Name:</strong> {data.lastName}</p>
                            <p><strong>Birth Date:</strong> {data.birthDate}</p>
                            <p><strong>Email:</strong> {data.email}</p>
                        </div>
                        <div className="profile-image">
                            {data.image && (typeof (data.image) == 'string') && <img src={imageUrl + data.image as string} alt="your profile image" />}
                            <br/>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        </div>

                    </div>

                    
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

                    <label htmlFor="imageFile">Picture</label>
                    <input type="file" id="imageFile" name="imageFile" onChange={onInputFileChange} />

                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Profile;
