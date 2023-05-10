import { combineReducers } from "redux";
import userReducer from "./User/reducers";
import mailReducer from "./Mail/reducers";
import profileReducer from "./Profile/reducers";
import locationReducer from "./Location/reducers";
import socketReducer from "./Socket/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  mail: mailReducer,
  profile: profileReducer,
  socket: socketReducer,
  location: locationReducer,
});

export default rootReducer;
