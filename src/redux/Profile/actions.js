import {
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_ACTIVITY_REQUEST,
    USER_ACTIVITY_SUCCESS
} from './types';
import api from '@/utils/callApi'

export function getUserInfo(user_id, cb) {
    return dispatch => api(`auth/user/login`, 'get', user_id).then(
        res => {

            dispatch({
                type: USER_INFO_REQUEST,
            });

            dispatch({
                type: USER_INFO_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error=>{
            console.log(error);
        })
}

export function getActivity(user_id, cb) {
    return dispatch => api(`auth/user/login`, 'get', user_id).then(
        res => {

            dispatch({
                type: USER_ACTIVITY_REQUEST,
            });

            dispatch({
                type: USER_ACTIVITY_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error=>{
            console.log(error);
        })
}





