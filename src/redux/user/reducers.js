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

const token = '';
const username = '';
const role = '';

if (typeof window !== 'undefined') {
    // Perform localStorage action
    token = sessionStorage.getItem('token');
    username = sessionStorage.getItem('username');
    role = sessionStorage.getItem('role');
}
const initialState = {
    token: token,
    username: username,
    role: role,
    loading: false,
    status: false,
    loginInfo: { success: false, msg: {} },
    resetPasswordInfo: { success: false, msg: '' },
    partnerCategory: { success: false, categories: [] }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };

        case USER_LOGIN_SUCCESS: {
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('role', action.payload.role);
            sessionStorage.setItem('username', action.payload.username)
            return {
                ...state,
                loginInfo: action.payload,
                token: action.payload.token,
                role: action.payload.role,
                username: action.payload.username
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

        case LOGOUT: {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('username');
            return {
                ...state,
            };
        }
        case USER_REGISTER_SUCCESS: {
            return {
                ...state,
                status: action.payload.success
            }
        }
        default:
            return {
                ...state,
            };
    }
};

export default userReducer;