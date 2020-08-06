import * as Actions from '../actions/sample'

export const sample = (state = {
    request: {},
    results: [],
    error: ""
}, action) => {
    switch(action.type){
        case Actions.GET_SAMPLE:
            return {
                request: action.payload.request,
                results: action.payload.data
            }
        case Actions.GET_SAMPLE_REQUEST_ERROR:
            return {
                request: {},
                results: [],
                error: action.payload.error
            }
        default:
            return state;
    }
}