import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer, postsReducer, popUpDataReducer } from './reducers';

const rootReducer = combineReducers({
    userReducer,
    postsReducer,
    popUpDataReducer,
})

export const Store = createStore(rootReducer, applyMiddleware(thunk))