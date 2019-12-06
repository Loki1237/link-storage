import { combineReducers } from 'redux';
import componentsReducer from './componentsReducer';
import modalsReducer from './modalsReducer';
import userReducer from './userReducer';
import languageReducer from './languageReducer';

export const reducers = combineReducers({
    components: componentsReducer,
    modal: modalsReducer,
    user: userReducer,
    elementNames: languageReducer
})