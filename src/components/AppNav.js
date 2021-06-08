import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom"
import { logoutUser } from "../store/actionCreators";
//import { logoutAuthedUser } from "../store/actions";

const AppNav = (props) => {
    let currentUser = useSelector((state) => state.usersData).currentUser
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    let authedUserLocal = localStorage.getItem('authedUser')
    const handelLogOut = () => {
        dispatch(logoutUser())
        history.push('/login')
    }

    useEffect(() => {
        console.log('app nav', props.history)
    }, [props])
    
    return (
        <>
            {authedUserLocal.length === 0 && <Redirect to={{
                pathname: '/login',
                state: { from: location }
            }} />}
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
        </>
    );
}

export default AppNav;
