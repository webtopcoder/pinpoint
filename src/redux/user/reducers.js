import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    LOGOUT, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    CATEGORY_GET_REQUEST,
    CATEGORY_GET_SUCCESS
 } from './types';

const initialState = {
    token: '',
    username: '',
    role: 0,
    loading: false,
    status: false,
    loginInfo: { success: false, msg: {} },
    resetPasswordInfo: {success: false, msg: ''},
    partnerCategory: {success: false, categories: []}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };

        case USER_LOGIN_SUCCESS: {
            sessionStorage.setItem('token', action.payload.token);
            return {
                ...state,
                loginInfo: action.payload
            };
        }

        case RESET_PASSWORD_REQUEST:
            return { ...state, loading: true };

        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordInfo: action.payload
            };
        }

        case CATEGORY_GET_REQUEST:
            return { ...state, loading: true };

        case CATEGORY_GET_SUCCESS: {
            return {
                ...state,
                partnerCategory: action.payload
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