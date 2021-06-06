import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from '../_DATA'
import { getAllQuestions, getAllUsers } from './actions'

export const getFetchedQuestions = () => {
    return (dispatch) => {
        _getQuestions().then((res) => {
            dispatch(getAllQuestions(res))
        })
    }

}

export const getFetchedUsers = () => {
    return (dispatch) => {
        _getUsers().then((users) => {
            dispatch(getAllUsers(users))
        })
    }
}

export const postAnswer = (body) => {
    return (dispatch) => { 
        _saveQuestionAnswer(body).then((res) => {
            dispatch(getFetchedQuestions())
            dispatch(getFetchedUsers())
        })
    }
}

export const postQuestion = (body,cb) => {
    return (dispatch) => { 
        _saveQuestion(body).then((res) => {
            dispatch(getFetchedQuestions())
            dispatch(getFetchedUsers())
            cb()
        })
    }
}
