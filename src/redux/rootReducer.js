import { combineReducers } from 'redux';
import userReducer from './User/reducers';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;