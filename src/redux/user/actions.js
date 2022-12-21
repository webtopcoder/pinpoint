import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    CATEGORY_GET_REQUEST,
    CATEGORY_GET_SUCCESS,
    LOGOUT,
} from './types';
import api from '@/utils/callApi'

export function loginUser(form, cb) {
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
            cb(res);
        }).catch(error=>{
            console.log(error);
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

            // localStorage.setItem('userInfo', JSON.stringify(res));

            cb(res);
        })
}

export function getCategory() {
    return dispatch => api(`base/categories`, 'get').then(
        res => {
            dispatch({
                type: CATEGORY_GET_REQUEST,
            });
            dispatch({
                type: CATEGORY_GET_SUCCESS,
                payload: res,
            });
        })
}

export function recoveryPassword(form, cb) {
    return dispatch => api(`auth/user/lostpassword`, 'post', form).then(
        res => {
            dispatch({
                type: RESET_PASSWORD_REQUEST,
            });

            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: res,
            });

            localStorage.setItem('userInfo', JSON.stringify(res));
            cb(res);
        })
}

export const logout = (cb) => (dispatch) => {
    dispatch({ type: LOGOUT });
    cb();
};



