import {
    SET_USER_DATA,
    SET_POSTS,
    ADD_POST,
    DELETE_POST,
    SET_POPUP_DATA
} from "./types";


export const setPosts = posts => dispatch => {
    dispatch({
        type: SET_POSTS,
        payload: posts,
    })
}


export const addPost = post => dispatch => {
    dispatch({
        type: ADD_POST,
        payload: post,
    })
}


export const deletePost = post => dispatch => {
    dispatch({
        type: DELETE_POST,
        payload: post,
    })
}


export const setUserData = userData => dispatch => {
    dispatch({
        type: SET_USER_DATA,
        payload: userData,
    })
}

export const setPopupData = (popupData) => dispatch => {
    dispatch({
        type: SET_POPUP_DATA,
        payload: popupData,
    })
}