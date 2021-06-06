import * as actions from './actionTypes'

let initialState = {
    users: [],
    currentUser: null
}

export const usersData = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ALL_USERS:
            return { ...state, users: action.payload }
        case actions.SET_AUTHED_USER:
            return { ...state, currentUser: action.payload }
        case actions.LOGOUT_AUTHED_USER:
            return { ...state, currentUser: null }
        default:
            return state
    }
}
