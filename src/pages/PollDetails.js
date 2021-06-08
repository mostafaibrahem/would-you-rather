import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { postAnswer } from "../store/actionCreators";

const PollDetails = () => {
    const { question_id } = useParams()
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const questionsList = useSelector(state => state.questionsData).questionsList
    const users = useSelector(state => state.usersData).users
    const currentUser = useSelector(state => state.usersData).currentUser
    let currentQuestion = questionsList && questionsList[question_id] ? questionsList[question_id] : null
    const optionOneVotes = currentQuestion && currentQuestion.optionOne.votes.length
    const optionTwoVotes = currentQuestion && currentQuestion.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = (optionOneVotes / totalVotes) * 100
    const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100
    const optionOneSlectedByLogedUser = currentQuestion && currentQuestion.optionOne.votes.includes(currentUser.id)
    const optionTwoSlectedByLogedUser = currentQuestion && currentQuestion.optionTwo.votes.includes(currentUser.id)

    useEffect(() => {
        const ourQuestion = new Promise((resolve, reject) => {
            return (
                questionsList &&
                resolve(Object.keys(questionsList).filter((question) => questionsList[question].id === question_id))

            )
        })
        ourQuestion.then((res) => {
            if (res.length === 0) history.push('/404')
        })
    }, [currentQuestion, users, questionsList, history, question_id])

    const submitAnswer = () => {
        let body = {
            authedUser: currentUser.id,
            qid: currentQuestion.id,
            answer: selectedAnswer
        }
        dispatch(postAnswer(body))
    }

    return (
        <>{currentQuestion &&
            <div className='main-container'>
                <h1>Would you Rather ? {users[currentQuestion.author] && <img src={users[currentQuestion.author].avatarURL} alt='avatar' />}</h1>
                {(optionOneSlectedByLogedUser || optionTwoSlectedByLogedUser) ?
                    <>
                        <p style={{ color: optionOneSlectedByLogedUser && 'blue' }}>{currentQuestion.optionOne.text} {currentQuestion.optionOne.votes && `${optionOneVotes} votes ${optionOnePercentage} %`}</p>
                        <p style={{ color: optionTwoSlectedByLogedUser && 'blue' }}>{currentQuestion.optionTwo.text} {currentQuestion.optionTwo.votes && `${optionTwoVotes} votes ${optionTwoPercentage} %`}</p>
                    </> :
                    <>
                        <input type="radio" id="optionOne" name="answers" value="optionOne" onChange={(e) => setSelectedAnswer(e.target.value)} />
                        <label htmlFor="optionOne">{currentQuestion.optionOne.text}</label><br />
                        <input type="radio" id="optionTwo" name="answers" value="optionTwo" onChange={(e) => setSelectedAnswer(e.target.value)} />
                        <label htmlFor="optionTwo">{currentQuestion.optionTwo.text}</label><br />
                        <button onClick={() => submitAnswer()}>Submit</button>
                    </>}
            </div>
        }
        </>
    );
}

export default PollDetails;
