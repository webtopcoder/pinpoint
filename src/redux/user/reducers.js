import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, LOGOUT, USER_REGISTER_SUCCESS } from './action-type';

const initialState = {
    token: '',
    username: '',
    role: 0,
    loading: false,
    status: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };

        case USER_LOGIN_SUCCESS: {
            sessionStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token
            };
        }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };

        case LOGOUT:
            return {};
        case USER_REGISTER_SUCCESS: {
            return {
                ...state,
                status: action.payload.success
            }
        }
        default:
            return state;
    }
};

export default userReducer;