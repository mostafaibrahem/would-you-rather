import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { getAllQuestions } from "../store/actions";
//import { _getQuestions } from "../_DATA";
import { getFetchedQuestions } from "../store/actionCreators";

const Home = () => {
    const dispatch = useDispatch()
    const [viewData, setViewData] = useState('unanswered')
    const questionsList = useSelector(state => state.questionsData).questionsList
    const currentUser = useSelector(state => state.usersData).currentUser
    let answerdQuestions = questionsList && Object.keys(questionsList).sort((a, b) => questionsList[b].timestamp - questionsList[a].timestamp).map((question, i) => questionsList[question]).filter((item) => (item.optionOne.votes.includes(currentUser.id) || item.optionTwo.votes.includes(currentUser.id)))
    let unAnswerdQuestions = questionsList && Object.keys(questionsList).sort((a, b) => questionsList[b].timestamp - questionsList[a].timestamp).map((question, i) => questionsList[question]).filter((item) => (item.optionOne.votes.includes(currentUser.id) === false && item.optionTwo.votes.includes(currentUser.id) === false))
    //console.log({ answerdQuestions })
    //console.log({ unAnswerdQuestions })
    let dataToShow = viewData === 'unanswered' ? unAnswerdQuestions : answerdQuestions

    useEffect(() => {
        dispatch(getFetchedQuestions())
    }, [currentUser, dispatch])

    return (
        <div className='main-container home__page--wrapper'>
            <div className='answerd__unAnswerd--header '>
                <span onClick={() => setViewData('unanswered')}>Unanswerd Questions</span>
                <span onClick={() => setViewData('answered')}>Answerd Questions</span>
            </div>
            <div className='questions__list--wrapper'>
                {questionsList && dataToShow.map((item) => {
                    return (
                        <div className='question-card' key={item.id}>

                            <p className='card-header'> {item.author} asks: </p>
                            <div>
                                <p>
                                    <span>{item.optionOne.text}</span>
                                   <span> or </span> 
                                     <span> {item.optionTwo.text}</span></p>

                            </div>
                            <Link to={`questions/${item.id}`}><button>View Poll</button></Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;
