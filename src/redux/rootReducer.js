import { combineReducers } from 'redux';
import userReducer from './User/reducers';
import contactReducer from './Contact/reducers';
import mailReducer from './Mail/reducers';

const rootReducer = combineReducers({
    user: userReducer,
    contact: contactReducer,
    mail: mailReducer
});

export default rootReducer;