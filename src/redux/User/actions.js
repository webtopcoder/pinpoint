import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  SUB_CATEGORY_GET_SUCCESS,
  GET_MYFOLLOWER_SUCCESS,
  LOGOUT,
  USER_EMAIL_VERIFICATION_REQUEST,
  USER_EMAIL_VERIFICATION_SUCCESS,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_REQUEST,
  SETTINGS_VALUE_GET_REQUEST,
  PARNTER_SETTINGS_CHANGE,
} from "./types";
import { S_LOGIN, S_NOTIFICATION } from "../Socket/types";
import api from "@/utils/callApi";

export function loginUser(form, cb) {
  return (dispatch) =>
    api(`auth/login`, "post", form)
      .then((res) => {
        dispatch({
          type: S_LOGIN,
          payload: res.user.id,
        });

        dispatch({
          type: USER_LOGIN_REQUEST,
        });

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res,
        });

        dispatch({
          type: S_NOTIFICATION,
        });

        localStorage.setItem("userInfo", JSON.stringify(res));
        cb(res);
      })
      .catch((error) => {
        console.error(error);
        cb(null, error);
      });
}

export function registerUser(form, cb) {
  return (dispatch) =>
    api(`auth/register`, "post", form)
      .then((res) => {
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
      .catch((error) => {
        cb(null, error);
      });
}

export function verifyUserEmail(form, cb) {
  return (dispatch) =>
    api(`auth/verify-email`, "post", form)
      .then((res) => {
        dispatch({
          type: USER_EMAIL_VERIFICATION_REQUEST,
        });

        dispatch({
          type: USER_EMAIL_VERIFICATION_SUCCESS,
          payload: res,
        });

        // localStorage.setItem('userInfo', JSON.stringify(res));

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getCategory() {
  return (dispatch) =>
    api(`categories`, "get").then((res) => {
      dispatch({
        type: CATEGORY_GET_REQUEST,
      });
      dispatch({
        type: CATEGORY_GET_SUCCESS,
        payload: res,
      });
    });
}

export function getsubCategory(categoryID, cb) {
  return (dispatch) =>
    api(`categories/${categoryID}/subcategories`, "get").then((res) => {
      dispatch({
        type: SUB_CATEGORY_GET_SUCCESS,
        payload: res,
      });
      cb(res);
    });
}

export function getmyFollowers() {
  const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  return (dispatch) =>
    api(`follow/${userId}/follower`, "get").then((res) => {
      dispatch({
        type: GET_MYFOLLOWER_SUCCESS,
        payload: res,
      });
    });
}

export function recoveryPassword(form, cb) {
  return (dispatch) =>
    api(`auth/user/lostpassword`, "post", form).then((res) => {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res,
      });

      localStorage.setItem("userInfo", JSON.stringify(res));
      cb(res);
    });
}

export const logout = (cb) => (dispatch) => {
  dispatch({ type: LOGOUT });
  cb();
};

export function getNotifications(params, cb) {
  return (dispatch) =>
    api(`notification`, "get", {}, params)
      .then((res) => {
        dispatch({
          type: GET_NOTIFICATION_REQUEST,
        });

        dispatch({
          type: GET_NOTIFICATION_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getSettingsValue(cb) {
  return (dispatch) =>
    api(`setting`, "get")
      .then((res) => {
        dispatch({
          type: SETTINGS_VALUE_GET_REQUEST,
          payload: res,
        });
        cb(res);
      })
      .catch((err) => {
        cb(null, err);
      });
}

export function postSettingsValue(data, cb) {
  return (dispatch) =>
    api(`setting`, "post", data)
      .then((res) => {
        dispatch({
          type: PARNTER_SETTINGS_CHANGE,
          payload: data,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}
