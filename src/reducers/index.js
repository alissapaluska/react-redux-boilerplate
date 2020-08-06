import { combineReducers } from 'redux'
import * as Actions from '../actions'
import { sample } from './sample'

const initState = (state = {
    initState: null
}, action) => {
    switch(action.type){
        case Actions.INIT_STATE:
            return {
                ...state,
                initState: action.payload.value
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    initState,
    sample
});

export default rootReducer;