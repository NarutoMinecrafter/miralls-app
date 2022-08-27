import {
    SET_USER_DATA,
    SET_POSTS,
    ADD_POST,
    DELETE_POST,
    SET_POPUP_DATA
} from "./types";


export function userReducer(state = null, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return action.payload

        default:
            return state
    }
}


export function postsReducer(state = [], action) {
    switch (action.type) {
        case SET_POSTS:
            return action.payload

        case ADD_POST:
            return state.push(action.payload)

        // case DELETE_POST:
        //     return state.push(action.payload)

        default:
            return state
    }
}


export function popUpDataReducer(state = false, action) {
    switch (action.type) {
        case SET_POPUP_DATA:
            return action.payload

        default:
            return state
    }
}

export default userReducer