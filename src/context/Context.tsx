import React from "react";
import User from "../models/User";

type ContextType = {
    user?: User
    setUser: (user:User) =>void
    token?: string
    setToken: (token:string) =>void
}
export const Context = React.createContext<ContextType>({
    setUser: (user:User) =>{},
    setToken: (token:string) =>{},
});

 const ContextProvider = ({ children }: {children:React.ReactElement}) => {
    const [user, setUser] = React.useState<User>();
    const [token, setToken] = React.useState<string>();
    return (
        <Context.Provider value={{user, setUser, token, setToken}}>
            {children}
        </Context.Provider>
    )
} // המטרה ליצור קונטקסט עבור האפליקציה

export default ContextProvider;