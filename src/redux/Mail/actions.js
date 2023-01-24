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
  DELETE_INBOX_SUCCESS,
  DOWNLOAD_FILE_SUCCESS,
  RESEND_INVITE_SUCCESS,
} from "./types";
import api from "@/utils/callApi";

export function mailCompose(form, cb) {
  return (dispatch) =>
    api(`mail/compose`, "post", form)
      .then((res) => {
        dispatch({
          type: MAIL_COMPOSE_REQUEST,
        });

        dispatch({
          type: MAIL_COMPOSE_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function sentInvite(form, cb) {
  return (dispatch) =>
    api(`mail/invite`, "post", form)
      .then((res) => {
        dispatch({
          type: SENT_INVITE_REQUEST,
        });

        dispatch({
          type: SENT_INVITE_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function downloadFile(filename) {
  return (dispatch) =>
    api(`base/download/${filename}`, "post", { type: "mail" })
      .then((res) => {
        console.log(res.blob());

        let url = window.URL.createObjectURL(res);
        let a = document.createElement("a");
        a.href = url;
        a.download = "employees.json";
        a.click();

        console.log(res);
        dispatch({
          type: DOWNLOAD_FILE_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getInbox(tableinfo, cb) {
  return (dispatch) =>
    api(
      `mail/inbox?page=${tableinfo.pagination.current}&limit=${
        tableinfo.pagination.pageSize
      }&order=${
        tableinfo.order && tableinfo.order == "ascend"
          ? "createdAt:asc"
          : "createdAt:desc"
      }`,
      "get"
    )
      .then((res) => {
        dispatch({
          type: GET_INBOX_REQUEST,
        });

        dispatch({
          type: GET_INBOX_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getSent(tableinfo, cb) {
  return (dispatch) =>
    api(
      `mail/sent?page=${tableinfo.pagination.current}&limit=${
        tableinfo.pagination.pageSize
      }&order=${
        tableinfo.order && tableinfo.order == "ascend"
          ? "createdAt:asc"
          : "createdAt:desc"
      }`,
      "get"
    )
      .then((res) => {
        dispatch({
          type: GET_SENT_REQUEST,
        });

        dispatch({
          type: GET_SENT_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getPending(tableinfo, cb) {
  return (dispatch) =>
    api(
      `mail/pending?page=${tableinfo.pagination.current}&limit=${
        tableinfo.pagination.pageSize
      }&order=${
        tableinfo.order && tableinfo.order == "ascend"
          ? "createdAt:asc"
          : "createdAt:desc"
      }`,
      "get"
    )
      .then((res) => {
        dispatch({
          type: GET_SENT_REQUEST,
        });

        dispatch({
          type: GET_SENT_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function resend_pending(mail_id, cb) {
  return (dispatch) =>
    api(`mail/${mail_id}/resend-invite`, "post")
      .then((res) => {
        dispatch({
          type: RESEND_INVITE_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function deleteSent(mail_id, cb) {
  return (dispatch) =>
    api(`mail/${mail_id}`, "delete")
      .then((res) => {
        dispatch({
          type: DELETE_SENT_REQUEST,
        });

        dispatch({
          type: DELETE_SENT_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function actionInbox(mail_id, cb) {
  return (dispatch) =>
    api(`mail/${mail_id}`, "delete")
      .then((res) => {
        dispatch({
          type: DELETE_INBOX_REQUEST,
        });

        dispatch({
          type: DELETE_INBOX_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}
