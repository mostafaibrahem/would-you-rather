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
    const currentQuestion = questionsList[question_id]
    const optionOneVotes = currentQuestion.optionOne.votes.length
    const optionTwoVotes = currentQuestion.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = (optionOneVotes / totalVotes) * 100
    const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100
    const optionOneSlectedByLogedUser = currentQuestion.optionOne.votes.includes(currentUser.id)
    const optionTwoSlectedByLogedUser = currentQuestion.optionTwo.votes.includes(currentUser.id)

   

    useEffect(() => {
        const redirect404 = () => {
            if (!currentQuestion) {
                history.push('/404')
            }
        }
        redirect404()

    }, [currentQuestion,history])

    const submitAnswer = () => {
       /*  console.log('authedUser', currentUser.id)
        console.log('qId', currentQuestion.id)
        console.log('answer', selectedAnswer) */
        let body = {
            authedUser: currentUser.id,
            qid: currentQuestion.id,
            answer: selectedAnswer
        }
        dispatch(postAnswer(body))
    }
    
    return (
        <div  className='main-container'>
            <h1>Would you Rather ? <img src={users[currentQuestion.author].avatarURL} alt='avatar'/></h1>
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
    );
}

export default PollDetails;
