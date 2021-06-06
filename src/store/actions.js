import * as actions from './actionTypes'


//-------------users actions-----------
export const getAllUsers = (users) => {
    return {
        type: actions.GET_ALL_USERS,
        payload: users
    }
}

export const setAuthedUser = (userID) => {
    return {
        type: actions.SET_AUTHED_USER,
        payload: userID
    }
}

export const logoutAuthedUser = () => {
    return {
        type: actions.LOGOUT_AUTHED_USER,
    }
}

//------------questions actions-----------
export const getAllQuestions = (questions) => {
    return {
        type: actions.GET_ALL_QUESTIONS,
        payload: questions
    }
}

export const answerQuestion = (answer) => {
    return {
        type: actions.ANSWER_QUESTION,
        payload: answer
    }
}

export const addQuestion = (question) => {
    return {
        type: actions.ADD_QUESTION,
        payload: question
    }
}
