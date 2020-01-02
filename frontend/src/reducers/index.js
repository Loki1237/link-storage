import { combineReducers } from 'redux';
import UserMenuReducer from './UserMenuReducer';
import modalsReducer from './modalsReducer';
import userReducer from './userReducer';
import languageReducer from './languageReducer';
import messageReducer from './messageReducer';

export const reducers = combineReducers({
    UserMenu: UserMenuReducer,
    modal: modalsReducer,
    message: messageReducer,
    user: userReducer,
    elementNames: languageReducer
})