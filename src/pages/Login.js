import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getFetchedUsers } from "../store/actionCreators";
import { setAuthedUser } from "../store/actions";
import reactReduxImg from '../resources/images/reactredux.jpeg'

const Login = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    let usersData = useSelector((state) => state.usersData)
    let users = usersData.users

    useEffect(() => {
        dispatch(getFetchedUsers())
    }, [dispatch])

    const handelSubmit = (event) => {
        event.preventDefault()
        if (selectedUser) {
            dispatch(setAuthedUser(selectedUser))
            history.push('/')
        }

    }

    const onUserChange = (event) => {
        const value = event.target.value
        if (value !== 0) {
            setSelectedUser(users[event.target.value])
        }
    }

    return (
           <form className='main-container login__page--wrapper' onSubmit={(event) => { handelSubmit(event) }}>
                <h1>Login</h1>
                <img src={reactReduxImg } alt='react-redux' />
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
    );
}

export default Login;
