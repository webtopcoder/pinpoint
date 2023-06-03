import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  ADDITION_USER_LOGIN_REQUEST,
  ADDITION_USER_LOGIN_SUCCESS,
  SUB_CATEGORY_GET_SUCCESS,
  GET_MYFOLLOWER_SUCCESS,
  LOGOUT,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  SETTINGS_VALUE_GET_REQUEST,
  PARNTER_SETTINGS_CHANGE,
  SETTINGS_VALUE_GET_SUCCESS,
  GET_FOLLOW_AND_FOLLOWING_SUCCESS,
  CLEAR_NOTIFICATION_REQUEST,
  CLEAR_NOTIFICATION_SUCCESS,
} from "./types";
import { NOTIFICATION_VIEWED, S_LOGIN, S_NOTIFICATION } from "../Socket/types";
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
        cb(res);
      })
      .catch((error) => {
        console.error(error);
        cb(null, error);
      });
}

export function loginAdditionUser(form, cb) {
  return (dispatch) =>
    api(`setting/loginUser`, "post", form)
      .then((res) => {
        dispatch({
          type: S_LOGIN,
          payload: res.user?.owner?.id,
        });

        dispatch({
          type: ADDITION_USER_LOGIN_REQUEST,
        });

        dispatch({
          type: ADDITION_USER_LOGIN_SUCCESS,
          payload: res,
        });
        dispatch({
          type: S_NOTIFICATION,
        });
        cb(res);
      })
      .catch((error) => {
        console.error(error);
        cb(null, error);
      });
}

export function getisFavorited(locationID, cb) {
  return (dispatch) =>
    api(`profile/getFavortied/${locationID}`, "get")
      .then((res) => {
        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getuserInfoByID(id, cb) {
  return () =>
    api(`auth/username?ID=${id}`, "get")
      .then((res) => {
        cb(res?.username);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getsubCategory(categoryID, cb) {
  return (dispatch) =>
    api(`categories/${categoryID}/subcategories`, "get")
      .then((res) => {
        dispatch({
          type: SUB_CATEGORY_GET_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getmyFollowers() {

  const user_id = localStorage.getItem('user_id')
  return (dispatch) =>
    api(`follow/${user_id}/follower`, "get").then((res) => {
      dispatch({
        type: GET_MYFOLLOWER_SUCCESS,
        payload: res,
      });
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

        dispatch({
          type: NOTIFICATION_VIEWED,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function clearNotifications() {
  return (dispatch) =>
    api(`notification/clear`, "get")
      .then((res) => {
        dispatch({
          type: CLEAR_NOTIFICATION_REQUEST,
        });

        dispatch({
          type: CLEAR_NOTIFICATION_SUCCESS,
        });
      })
      .catch((error) => {
        console.log(error);
      });
}

export function updatedNotifications(id, cb) {
  return (dispatch) =>
    api(`notification/${id}/mark-as-read`, "post").then((res) => {
      dispatch({
        type: UPDATE_NOTIFICATION_REQUEST,
      });

      dispatch({
        type: UPDATE_NOTIFICATION_SUCCESS,
      });
      cb(res);
    });
}

export function getSettingsValue(cb) {
  return (dispatch) =>
    api(`setting`, "get")
      .then((res) => {
        dispatch({
          type: SETTINGS_VALUE_GET_REQUEST,
        });
        dispatch({
          type: SETTINGS_VALUE_GET_SUCCESS,
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

export function getFollowerAndFollowing(cb) {
  return (dispatch) =>
    api(`follow`, "get")
      .then((res) => {
        dispatch({
          type: GET_FOLLOW_AND_FOLLOWING_SUCCESS,
          payload: res,
        });
        cb && cb(res);
      })
      .catch((error) => {
        console.log(error);
        cb && cb(null, error);
      });
}

