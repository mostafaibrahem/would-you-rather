import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postQuestion } from "../store/actionCreators";

const NewQuestion = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.usersData).currentUser
    const [optionOneText, setOptionOneText] = useState('')
    const [optionTwoText, setOptionTwoText] = useState('')
    const onSubmitQuestion = (e) => {
        e.preventDefault()
        let question = {
            author: currentUser.id,
            optionOneText: optionOneText,
            optionTwoText:optionTwoText
        }

        dispatch(postQuestion(question, () => { history.push('/') }))
        //console.log({ question })
    }
    return (
        <div className='main-container'>
            <h1>Create New Question</h1>
            <h4>compelete the question</h4>
            <h2>Would you rather</h2>
            <form onSubmit={(e) => onSubmitQuestion(e)}>
                <input type='text' placeholder='Enter Option One Text Here' value={optionOneText} onChange={(e) => setOptionOneText(e.target.value)} />
                <p>or</p>
                <input type='text' placeholder='Enter Option Two Text Here' value={optionTwoText} onChange={(e) => setOptionTwoText(e.target.value)} />
                <br />
                <input type='submit' />
            </form>

        </div>
    );
}

export default NewQuestion;
