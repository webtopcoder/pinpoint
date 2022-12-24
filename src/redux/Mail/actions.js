import {
    MAIL_COMPOSE_REQUEST,
    MAIL_COMPOSE_SUCCESS,
    SENT_INVITE_REQUEST,
    SENT_INVITE_SUCCESS,
    GET_INBOX_REQUEST,
    GET_INBOX_SUCCESS,
    GET_SENT_REQUEST,
    GET_SENT_SUCCESS,
    DELETE_SENT_REQUEST,
    DELETE_SENT_SUCCESS,
    DELETE_INBOX_REQUEST,
    DELETE_INBOX_SUCCESS
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

    return dispatch => api(`mail/invite`, 'post', form).then(
        res => {
            dispatch({
                type: SENT_INVITE_REQUEST,
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

export function getInbox(tableinfo, cb) {

    return dispatch => api(`mail/inbox?page=${tableinfo.pagination.current}&pageSize=${tableinfo.pagination.pageSize}&order= ${tableinfo.order && tableinfo.order == 'ascend' ? 1 : -1}`, 'get').then(
        res => {
            dispatch({
                type: GET_INBOX_REQUEST,
            });

            dispatch({
                type: GET_INBOX_SUCCESS,
                payload: res,
            });

            cb(res);

        }).catch(error => {
            console.log(error);
        })
}

export function getSent(tableinfo, cb) {

    return dispatch => api(`mail/sent?page=${tableinfo.pagination.current}&pageSize=${tableinfo.pagination.pageSize}&order= ${tableinfo.order && tableinfo.order == 'ascend' ? 1 : -1}`, 'get').then(
        res => {
            dispatch({
                type: GET_SENT_REQUEST,
            });

            dispatch({
                type: GET_SENT_SUCCESS,
                payload: res,
            });

            cb(res);

        }).catch(error => {
            console.log(error);
        })
}

export function deleteSent(data, cb) {

    return dispatch => api(`mail`, 'put', data).then(
        res => {
            dispatch({
                type: DELETE_SENT_REQUEST,
            });

            dispatch({
                type: DELETE_SENT_SUCCESS,
                payload: res,
            });

            cb(res);

        }).catch(error => {
            console.log(error);
        })
}

export function actionInbox(data, cb) {

    return dispatch => api(`mail`, 'put', data).then(
        res => {
            dispatch({
                type: DELETE_INBOX_REQUEST,
            });

            dispatch({
                type: DELETE_INBOX_SUCCESS,
                payload: res,
            });

            cb(res);

        }).catch(error => {
            console.log(error);
        })
}



