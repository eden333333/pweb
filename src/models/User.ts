
interface User {
    id?: number, // רק לאחר הרשמה
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: string;
}

export default User;