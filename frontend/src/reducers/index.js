import { combineReducers } from 'redux';
import UserMenuReducer from './UserMenuReducer';
import modalsReducer from './modalsReducer';
import appDataReducer from './appDataReducer';

export const reducers = combineReducers({
    UserMenu: UserMenuReducer,
    modal: modalsReducer,
    appData: appDataReducer
});
