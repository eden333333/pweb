import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Context} from'../context/Context';

import './Menu.css';
const Menu = () => {
    const ctx = useContext(Context);
    // const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false)
    const navigate = useNavigate()
    const onLogout = () => {
        ctx.logout();
        navigate('/login')
    }

    // return(
    //     <>
    //         {!userAuthenticated ?(
    //         <ol>
    //             <li><NavLink to="/login">Login</NavLink></li>
    //             <li><NavLink to="/register">Register</NavLink></li>
    //         </ol>):(
    //         <ol>
    //             <li><NavLink to="/logout">Logout</NavLink></li>
    //             <li><NavLink to="/profile">Profile</NavLink></li>
    //             <li><NavLink to="/content">Content</NavLink></li>
    //             <li><NavLink to="/create-post">Create Post</NavLink></li>
    //         </ol>)}
    //     </>
    // )
    return(
        <div className="menu-container">
            
            <ol>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li onClick={onLogout}>Logout</li>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/content">Content</NavLink></li>
                <li><NavLink to="/create-post">Create Post</NavLink></li>
            </ol>
        </div>
    )
}

export default Menu;