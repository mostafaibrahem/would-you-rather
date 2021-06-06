import { combineReducers } from 'redux'
import { usersData } from './usersReducer'
import { questionsData } from './questionsReducer'

export const allReducers = combineReducers({ usersData, questionsData })