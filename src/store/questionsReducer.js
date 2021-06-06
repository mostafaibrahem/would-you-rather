import * as actions from './actionTypes'

let initialState = {
    questionsList: null,

}

export const questionsData = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ALL_QUESTIONS:
            return { ...state, questionsList: action.payload }
        default:
            return state
    }
}
