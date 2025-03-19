import React, { useEffect } from "react";
import User from "../models/User";

type ContextType = {
    user?: User
    token: string
    refreshToken: string
    setAuth: (user:User,token:string,refreshToken:string) =>void,
    logout: () =>void
}
export const Context = React.createContext<ContextType>({
    setAuth: (user:User,token:string, refreshToken:string) =>{},
    token:'',
    refreshToken:'',
    user: {birthDate:'', firstName: '', lastName: '', email: '', password: ''},
    logout: () => {}
});

 const ContextProvider = ({ children }: {children:React.ReactElement}) => {
    const defaultUser = {token:'', refreshToken:'', user: {birthDate:'', firstName: '', lastName: '', email: '', password: ''}};
    const [authData, setAuthData] = React.useState<{token:string, refreshToken:string, user:User}>(defaultUser);
    const [isLoading , setIsLoading] = React.useState<boolean>(false);

     const setAuth = (user:User, token:string, refreshToken:string) =>{
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', token);
        setAuthData({token, refreshToken, user});
     }

     const logout = () => {
        setAuthData(defaultUser)
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
     }
     useEffect(() => {  
        const token = localStorage.getItem('token');  
        const refreshToken = localStorage.getItem('refreshToken');  
        const userString = localStorage.getItem('user');
        if (token && userString && refreshToken) {   
            setIsLoading(true);
            setAuthData((prev) => {
                let user:User|undefined =undefined;
                if(userString)
                    user = JSON.parse(userString);
                setIsLoading(false);
                if(user)
                    return {token, refreshToken, user};
                else
                    return {...authData};
            });  
        }
        

     }, [])
     if(isLoading)<div>Loading please wait</div>
    return (
        <Context.Provider value={{user: authData.user, setAuth, token:authData.token, refreshToken:authData.refreshToken, logout}}>

            {children}
        </Context.Provider>
    )
} // המטרה ליצור קונטקסט עבור האפליקציה

export default ContextProvider;