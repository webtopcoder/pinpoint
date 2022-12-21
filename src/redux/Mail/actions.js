import {
    MAIL_COMPOSE_REQUEST,
    MAIL_COMPOSE_SUCCESS,
    SENT_INVITE_REQUEST,
    SENT_INVITE_SUCCESS,
    GET_INBOX_REQUEST,
    GET_INBOX_SUCCESS,
} from './types';
import api from '@/utils/callApi'

export function mailCompose(form, cb) {
    
    return dispatch => api(`mail/compose`, 'post', form).then(
        res => {
            dispatch({
                type: MAIL_COMPOSE_REQUEST,
            });

            dispatch({
                type: MAIL_COMPOSE_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function sentInvite(form, cb) {
    
    console.log(form);
    return dispatch => api(`mail/invite`, 'post', form).then(
        res => {
            dispatch({
                type: GET_INBOX_REQUEST,
            });

            dispatch({
                type: SENT_INVITE_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function getInbox() {
    
    return dispatch => api(`mail/inbox`, 'get').then(
        res => {
            dispatch({
                type: SENT_INVITE_REQUEST,
            });

            dispatch({
                type: GET_INBOX_SUCCESS,
                payload: res,
            });

        }).catch(error => {
            console.log(error);
        })
}


