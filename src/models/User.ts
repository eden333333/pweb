
interface User {
    _id?: string, // רק לאחר הרשמה
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: string;
    image?:File|string;
}

export default User;