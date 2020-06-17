import { combineReducers } from 'redux';
import authReducer from './authReducer';
import linkReducer from './linkReducer';

export default combineReducers({
    auth: authReducer,
    links: linkReducer
});
