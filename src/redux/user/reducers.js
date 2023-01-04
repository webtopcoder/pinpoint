import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    LOGOUT,
    USER_REGISTER_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    CATEGORY_GET_REQUEST,
    CATEGORY_GET_SUCCESS,
    SUB_CATEGORY_GET_SUCCESS,
    GET_MYFOLLOWER_SUCCESS
} from './types';

const token = '';
const username = '';
const role = '';
const user_id = '';
const avatar = '';

if (typeof window !== 'undefined') {
    // Perform localStorage action
    token = sessionStorage.getItem('token');
    username = sessionStorage.getItem('username');
    role = sessionStorage.getItem('role');
    user_id = sessionStorage.getItem('user_id');
    avatar = sessionStorage.getItem('avatar');
}

const initialState = {
    token: token,
    username: username,
    user_id: user_id,
    role: role,
    avatar: avatar,
    loading: false,
    status: false,
    loginInfo: { success: false, msg: {} },
    resetPasswordInfo: { success: false, msg: '' },
    partnerCategory: { success: false, categories: []},
    partnersubCategory: { success: false, categories: []},
    myFollowers: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };

        case USER_LOGIN_SUCCESS: {
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('role', action.payload.role);
            sessionStorage.setItem('username', action.payload.username);
            sessionStorage.setItem('user_id', action.payload.id);
            sessionStorage.setItem('avatar', action.payload.avatar ? action.payload.avatar : '');
            return {
                ...state,
                token: action.payload.token,
                role: action.payload.role,
                username: action.payload.username,
                user_id: action.payload.id,
                avatar: action.payload.avatar
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

        case SUB_CATEGORY_GET_SUCCESS: {
            return {
                ...state,
                partnersubCategory: action.payload
            };
        }

        case GET_MYFOLLOWER_SUCCESS: {
            return {
                ...state,
                myFollowers: action.payload
            };
        }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };

        case LOGOUT: {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('avatar');
            sessionStorage.removeItem('user_id');
            return {
                ...state,
                token: null,
                role: 0,
                username: '',
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