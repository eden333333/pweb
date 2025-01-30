import {useState} from 'react';

const Menu = () => {
    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false)

    return(
        <>
            {!userAuthenticated ?(
            <ol>
                <li>Login</li>
                <li>Register</li>
            </ol>):(
            <ol>
                <li>Logout</li>
                <li>Profile</li>
                <li>Content</li>
                <li>Create Post</li>
            </ol>)}
        </>
    )
}

export default Menu;