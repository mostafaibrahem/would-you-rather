import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { getFetchedUsers, loginUser } from "../store/actionCreators";
import reactReduxImg from '../resources/images/reactredux.jpeg'

const Login = (props) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const dispatch = useDispatch()
    let usersData = useSelector((state) => state.usersData)
    let users = usersData.users

    useEffect(() => {
        dispatch(getFetchedUsers())
    }, [dispatch])

    const handelSubmit = (event) => {
        event.preventDefault()
        if (selectedUser) {
            dispatch(loginUser(selectedUser))
            //  history.push(from)
            redirectTopage()
        }

    }
    const redirectTopage = () => {
        const { from } = props.location.state || { from: { pathname: '/' } }
        let authedUserLocal = localStorage.getItem('authedUser')
        return (
            authedUserLocal.length > 0 && <Redirect to={from} />
        )
    }

    const onUserChange = (event) => {
        const value = event.target.value
        if (value !== 0) {
            setSelectedUser(users[event.target.value])
        }
    }

    return (
        <>
            {redirectTopage()}
            <form className='main-container login__page--wrapper' onSubmit={(event) => { handelSubmit(event) }}>
                <h1>Login</h1>
                <img src={reactReduxImg} alt='react-redux' />
                <select onChange={(event) => onUserChange(event)} defaultValue={0}>
                    <option value={0} disabled>please Select user</option>
                    {Object.keys(users).map((user, i) => {
                        return (
                            <option key={i} value={users[user].id} style={{ backgroundImage: users[user].avatarUrl }}>
                                {users[user].name}
                            </option>
                        )
                    })}
                </select>
                <input type='submit' />
            </form>
        </>
    );
}

export default Login;
