import User from "../models/User";


interface UserViewProps{
    user: User
}
const UserView = (props :UserViewProps) =>{        // parameter properties

    const user =  props.user;
    return(
        <div>
            <p>{user.firstName} {user.lastname}</p>
            <hr />
            <p>{user.email}</p>
        </div>
    )
}

export default UserView;