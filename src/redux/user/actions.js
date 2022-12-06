import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    LOGOUT,
} from './action-type';
import api from '@/utils/callApi'

export function loginUser(form) {
    return dispatch => api(`auth/user/login`, 'post', form).then(
        res => {

            dispatch({
                type: USER_LOGIN_REQUEST,
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res,
            });

            localStorage.setItem('userInfo', JSON.stringify(res));

        })
}

export function registerUser(form, cb) {
    return dispatch => api(`auth/user/register`, 'post', form).then(
        res => {

            dispatch({
                type: USER_REGISTER_REQUEST,
            });

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: res,
            });

            localStorage.setItem('userInfo', JSON.stringify(res));

            cb(res);
        })
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: LOGOUT });
};



