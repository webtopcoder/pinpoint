import { combineReducers } from 'redux';
import userReducer from './User/reducers';
import contactReducer from './Contact/reducers';

const rootReducer = combineReducers({
    user: userReducer,
    contact: contactReducer,
});

export default rootReducer;