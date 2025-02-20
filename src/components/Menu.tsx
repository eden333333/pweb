import { NavLink } from 'react-router-dom';

import './Menu.css';
const Menu = () => {
    // const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false)

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
                <li><NavLink to="/logout">Logout</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/content">Content</NavLink></li>
                <li><NavLink to="/create-post">Create Post</NavLink></li>
            </ol>
        </div>
    )
}

export default Menu;