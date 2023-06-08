import api from "@/utils/callApi";
import { S_LOGIN, S_NOTIFICATION } from "../Socket/types";
import { LOGOUT } from "../User/types";

import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  PARTNERSHIPS_GET_REQUEST,
  PARTNERSHIPS_GET_SUCCESS,
  PARTNERSHIP_SUBSCRIBE_REQUEST,
  PARTNERSHIP_SUBSCRIBE_SUCCESS,
  PARTNERSHIP_CREATE_CUSTOMER_REQUEST,
  PARTNERSHIP_CREATE_CUSTOMER_SUCCESS,
  PARTNERSHIP_TRANSACTION_SUCCESS,
  PARTNERSHIP_CANCEL_SUBSCRIBE_REQUEST,
  PARTNERSHIP_CANCEL_SUBSCRIBE_SUCCESS,
} from "./types";

export function getUserInfo(cb) {
  return (dispatch) =>
    api(`auth/me`, "get")
      .then((res) => {
        dispatch({
          type: S_LOGIN,
          payload: res.user.id,
        });

        dispatch({
          type: USER_INFO_REQUEST,
        });

        dispatch({
          type: USER_INFO_SUCCESS,
          payload: res,
        });

        dispatch({
          type: S_NOTIFICATION,
        });

        cb(res);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          dispatch({
            type: LOGOUT,
          });
        }
        cb(null, error);
        console.clear();
      });
}
export function createCustomer(cb) {
  return (dispatch) => {
    api(`/partnership/create-customer`, "post")
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_CREATE_CUSTOMER_REQUEST,
        });
        dispatch({
          type: PARTNERSHIP_CREATE_CUSTOMER_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}
export function subscribe(data, cb) {
  return (dispatch) => {
    api(`/partnership/subscribe`, "post", data)
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_SUBSCRIBE_REQUEST,
        });
        dispatch({
          type: PARTNERSHIP_SUBSCRIBE_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}
export function cancelSubscription(data, cb) {
  return (dispatch) => {
    api(`/partnership/cancel-subscribe`, "delete", data)
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_CANCEL_SUBSCRIBE_REQUEST,
        });
        dispatch({
          type: PARTNERSHIP_CANCEL_SUBSCRIBE_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}

export function removePartnership() {
  return (dispatch) => {
    api(`/partnership/removePartnership`, "delete")
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_CANCEL_SUBSCRIBE_REQUEST,
        });
        dispatch({
          type: PARTNERSHIP_CANCEL_SUBSCRIBE_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function postTransaction(data, cb) {
  return (dispatch) => {
    api(`/partnership/create-transaction`, "post", data)
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_TRANSACTION_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}
export function getPartnerships(cb) {
  return (dispatch) => {
    api(`/partnership`, "get")
      .then((res) => {
        dispatch({
          type: PARTNERSHIPS_GET_REQUEST,
        });
        dispatch({
          type: PARTNERSHIPS_GET_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}


