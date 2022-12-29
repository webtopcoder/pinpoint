import { combineReducers } from 'redux';
import userReducer from './User/reducers';
import contactReducer from './Contact/reducers';
import mailReducer from './Mail/reducers';
import profileReducer from './Profile/reducers';
import socketReducer from './Socket/reducers';

const rootReducer = combineReducers({
    user: userReducer,
    contact: contactReducer,
    mail: mailReducer,
    profile: profileReducer,
    socket: socketReducer,
});

export default rootReducer;