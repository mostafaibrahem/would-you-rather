import { useSelector } from "react-redux";

const LeaderBoard = () => {
    let users = useSelector((state) => state.usersData).users
    let userstoDisplay = Object.keys(users).map((user) => ({ ...users[user], total: users[user].questions.length + Object.keys(users[user].answers).length })).sort((a,b)=> b.total - a.total)
    


    return (
        <div className='main-container'>
            <h1>LeaderBoard</h1>
            <div>
                {userstoDisplay.map((user, i) => {
                    return (
                        <div key={i} >
                            {user.name} <img src={user.avatarURL} alt={user.name} /> asked: {user.questions.length} questions answered: {Object.keys(user.answers).length} questions total : {user.total}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default LeaderBoard;
