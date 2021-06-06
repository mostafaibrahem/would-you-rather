import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom"
import { logoutAuthedUser } from "../store/actions";

const AppNav = () => {
    let currentUser = useSelector((state) => state.usersData).currentUser
    const dispatch = useDispatch()
    const history = useHistory()
    const handelLogOut = () => {
        dispatch(logoutAuthedUser())
        history.push('/login')
    }

    useEffect(() => {
        const redirectToLogin = () => {
            if (currentUser === null) history.push('/login')
        }
        redirectToLogin();
    }, [history, currentUser])

    return (
        <nav className='container'>
            <div className='left__side--nav'>
                <Link to='/'>Home</Link>
                <Link to='/add'>New Question</Link>
                <Link to='/Leaderboard'>Leaderboard</Link>
            </div>
            <div className='right__side--nav'>
                <div className='user-profile-wrapper'>{currentUser && currentUser.name} <img src={currentUser && currentUser.avatarURL} alt='user-avatar' /></div>
                <span className='logout-word' onClick={() => handelLogOut()}>Logout</span>
            </div>
        </nav>
    );
}

export default AppNav;
