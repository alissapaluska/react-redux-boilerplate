export const INIT_STATE = "INIT_STATE";
export const SET_STATE = "SET_STATE";

export function initState(){
    return { type: INIT_STATE };
}

export function setState(value) {
    return { type: SET_STATE, payload: value};
}