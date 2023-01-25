import {
  MAIL_COMPOSE_REQUEST,
  MAIL_COMPOSE_SUCCESS,
  SENT_INVITE_REQUEST,
  SENT_INVITE_SUCCESS,
  GET_INBOX_REQUEST,
  GET_INBOX_SUCCESS,
  GET_SENT_REQUEST,
  GET_SENT_SUCCESS,
  DOWNLOAD_FILE_SUCCESS,
  RESEND_INVITE_SUCCESS,
  GET_NOTICE_REQUEST,
  GET_NOTICE_SUCCESS,
  GET_PENDING_REQUEST,
  GET_PENDING_SUCCESS,
  UPDATE_MAIL_REQUEST,
  UPDATE_MAIL_SUCCESS,
  DELETE_MAIL_REQUEST,
  DELETE_MAIL_SUCCESS,
  BULK_MAIL_ACTION_REQUEST,
  BULK_MAIL_ACTION_SUCCESS,
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
        cb(null, error);
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
        cb(null, error);
      });
}

export function downloadFile(filename) {
  return (dispatch) =>
    api(`media/download/${filename}`, "get")
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
          ? "updatedAt:asc"
          : "updatedAt:desc"
      }`,
      "get"
    )
      .then((res) => {
        dispatch({
          type: GET_PENDING_REQUEST,
        });

        dispatch({
          type: GET_PENDING_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getNotice(tableinfo, cb) {
  return (dispatch) =>
    api(
      `mail/notices?page=${tableinfo.pagination.current}&limit=${
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
          type: GET_NOTICE_REQUEST,
        });

        dispatch({
          type: GET_NOTICE_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function resendPending(mail_id, cb) {
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
        cb(null, error);
      });
}

export function deleteMail(mail_id, cb) {
  return (dispatch) =>
    api(`mail/${mail_id}`, "delete")
      .then((res) => {
        dispatch({
          type: DELETE_MAIL_REQUEST,
        });

        dispatch({
          type: DELETE_MAIL_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function updateMail(mail_id, form, cb) {
  return (dispatch) =>
    api(`mail/${mail_id}`, "patch", form)
      .then((res) => {
        dispatch({
          type: UPDATE_MAIL_REQUEST,
        });

        dispatch({
          type: UPDATE_MAIL_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function bulkMailAction({ mailIds, action }, cb) {
  return (dispatch) =>
    api(`mail/bulk-actions`, "post", {
      mailIds,
      action,
    })
      .then((res) => {
        dispatch({
          type: BULK_MAIL_ACTION_REQUEST,
        });

        dispatch({
          type: BULK_MAIL_ACTION_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}
