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
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  SETTINGS_VALUE_GET_REQUEST,
  PARNTER_SETTINGS_CHANGE,
  SETTINGS_VALUE_GET_SUCCESS,
  GET_FOLLOW_AND_FOLLOWING_SUCCESS,
  GET_FAQ_SUCCESS,
  BUSINESS_UPDATE_INFO_REQUEST,
  BUSINESS_UPDATE_INFO_SUCCESS,
  GET_ACTIVE_PARTNERS_REQUEST,
  GET_ACTIVE_PARTNERS_SUCCESS,
  CLEAR_NOTIFICATION_REQUEST,
  CLEAR_NOTIFICATION_SUCCESS,
  GET_DEFAULT_AVATAR_REQUEST,
  GET_DEFAULT_AVATAR_SUCCESS,
} from "./types";
import { NOTIFICATION_VIEWED, S_LOGIN, S_NOTIFICATION } from "../Socket/types";
import api from "@/utils/callApi";
import { USER_INFO_SUCCESS } from "../Profile/types";

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
          type: USER_INFO_SUCCESS,
          payload: res,
        });

        dispatch({
          type: S_NOTIFICATION,
        });

        localStorage.setItem("userInfo", JSON.stringify(res.user));
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

export function getDefaultAvatar(cb) {
  return (dispatch) =>
    api(`auth/getDefaultAvatar`, "get")
      .then((res) => {
        cb(res);
      })
      .catch((error) => {
        console.log(error);
        cb(res);
      });
}

export function getActivepartners() {
  return (dispatch) =>
    api(`auth/partners?status=active`, "get")
      .then((res) => {
        dispatch({
          type: GET_ACTIVE_PARTNERS_REQUEST,
        });

        dispatch({
          type: GET_ACTIVE_PARTNERS_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
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

export function getTestimonials(cb) {
  return (dispatch) =>
    api(`admin/testimonial/all`, "get")
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

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function sendVerificationEmail(form, cb) {
  return (dispatch) =>
    api(`auth/send-verification-email`, "post", form)
      .then((res) => {
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

  const userId = sessionStorage.getItem("user_id");
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
    api(`auth/reset-password`, "post", form)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_REQUEST,
        });

        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function forgotPassword(form, cb) {
  return (dispatch) =>
    api(`auth/forgot-password`, "post", form)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_REQUEST,
        });

        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
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

export function getFaqs(cb) {
  return (dispatch) =>
    api(`base/faq`, "get")
      .then((res) => {
        dispatch({
          type: GET_FAQ_SUCCESS,
          payload: res,
        });
        cb && cb(res);
      })
      .catch((error) => {
        console.log(error);
        cb && cb(null, error);
      });
}

export function updateBusinessDetail(info, cb) {
  return (dispatch) =>
    api(`profile`, "patch", info)
      .then((res) => {
        dispatch({
          type: BUSINESS_UPDATE_INFO_REQUEST,
        });

        dispatch({
          type: BUSINESS_UPDATE_INFO_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}
