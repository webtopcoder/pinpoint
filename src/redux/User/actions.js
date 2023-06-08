import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  ADDITION_USER_LOGIN_REQUEST,
  ADDITION_USER_LOGIN_SUCCESS,
  GET_MYFOLLOWER_SUCCESS,
  LOGOUT,
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
