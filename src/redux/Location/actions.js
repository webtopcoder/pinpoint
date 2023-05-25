import api from "@/utils/callApi";
import {
  LOCATION_REVIEW_REQUEST,
  LOCATION_REVIEW_SUCCESS,
  USER_LOCATION_ID_SUCCESS,
  USER_LOCATION_REQUEST,
  LOCATION_FAVORITE_REQUEST,
  LOCATION_FAVORITE_SUCCESS,
  LOCATION_GET_FAVORITE_REQUEST,
  LOCATION_GET_FAVORITE_SUCCESS,
  LOCATION_CHECKIN_REQUEST,
  LOCATION_CHECKIN_SUCCESS,
  USER_EXPIRED_ARRIVAL_REQUEST,
  USER_EXPIRED_ARRIVAL_SUCCESS
} from "./types";

export function getLocationById({ id, expand }, cb) {
  return (dispatch) =>
    api(`locations/${id}/${expand}`, "get")
      .then((res) => {
        dispatch({
          type: USER_LOCATION_REQUEST,
        });
        dispatch({
          type: USER_LOCATION_ID_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getExpiredArrival({ id, ...params }, cb) {
  return (dispatch) =>
    api(`locations/arrival/${id}`, "get", {}, params)
      .then((res) => {
        dispatch({
          type: USER_EXPIRED_ARRIVAL_REQUEST,
        });

        dispatch({
          type: USER_EXPIRED_ARRIVAL_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function postReview(locationId, form, cb) {
  return (dispatch) =>
    api(`locations/${locationId}/review`, "post", form)
      .then((res) => {
        dispatch({
          type: LOCATION_REVIEW_REQUEST,
        });

        dispatch({
          type: LOCATION_REVIEW_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function likeLocationReview(reviewId, cb) {
  return (dispatch) =>
    api(`locations/review/${reviewId}/like`, "post")
      .then((res) => {
        dispatch({
          type: LOCATION_REVIEW_REQUEST,
        });

        dispatch({
          type: LOCATION_REVIEW_SUCCESS,
        });

        cb(res.liked);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function likeArrival(arrivalID, cb) {
  return (dispatch) =>
    api(`locations/${arrivalID}/like`, "post")
      .then((res) => {
        dispatch({
          type: LOCATION_REVIEW_REQUEST,
        });

        dispatch({
          type: LOCATION_REVIEW_SUCCESS,
        });

        cb(res.liked);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function checkInArrival(arrivalID, cb) {
  return (dispatch) =>
    api(`locations/${arrivalID}/check-in`, "post")
      .then((res) => {
        dispatch({
          type: LOCATION_CHECKIN_REQUEST,
        });
        dispatch({
          type: LOCATION_CHECKIN_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function favoriteLocation(locationId, cb) {
  return (dispatch) =>
    api(`locations/${locationId}/favorite`, "post")
      .then((res) => {
        dispatch({
          type: LOCATION_FAVORITE_REQUEST,
        });

        dispatch({
          type: LOCATION_FAVORITE_SUCCESS,
          payload: true,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function unfavoriteLocation(locationId, cb) {
  return (dispatch) =>
    api(`locations/${locationId}/favorite`, "delete")
      .then((res) => {
        dispatch({
          type: LOCATION_FAVORITE_REQUEST,
        });

        dispatch({
          type: LOCATION_FAVORITE_SUCCESS,
          payload: false,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getFavouriteLocations(userId, cb) {
  return (dispatch) =>
    api(`locations/favorite/${userId}`, "get")
      .then((res) => {
        dispatch({
          type: LOCATION_GET_FAVORITE_REQUEST,
        });

        dispatch({
          type: LOCATION_GET_FAVORITE_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

