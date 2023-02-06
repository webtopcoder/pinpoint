import api from "@/utils/callApi";
import {
  LOCATION_QUICK_ARRIVAL_REQUEST,
  LOCATION_QUICK_ARRIVAL_SUCCESS,
  LOCATION_QUICK_DEPARTURE_REQUEST,
  LOCATION_QUICK_DEPARTURE_SUCCESS,
  LOCATION_REVIEW_REQUEST,
  LOCATION_REVIEW_SUCCESS,
  USER_LOCATION_ADD_SUCCESS,
  USER_LOCATION_ID_SUCCESS,
  USER_LOCATION_REQUEST,
  USER_LOCATION_SUCCESS,
  LOCATION_UPDATE_REQUEST,
  LOCATION_UPDATE_SUCCESS,
  LOCATION_DELETE_REQUEST,
  LOCATION_DELETE_SUCCESS,
} from "./types";

export function quickArrival({ form, locationId }, cb) {
  return (dispatch) =>
    api(`locations/${locationId}/quick-arrival`, "post", form)
      .then((res) => {
        dispatch({
          type: LOCATION_QUICK_ARRIVAL_REQUEST,
        });

        dispatch({
          type: LOCATION_QUICK_ARRIVAL_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function quickDeparture(form, cb) {
  return (dispatch) =>
    api(`locations/${form.locationId}/quick-departure`, "post")
      .then((res) => {
        dispatch({
          type: LOCATION_QUICK_DEPARTURE_REQUEST,
        });

        dispatch({
          type: LOCATION_QUICK_DEPARTURE_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getLocations({ pagination = false, partner, isActive }, cb) {
  return (dispatch) =>
    api(
      `locations?pagination=${pagination}&partner=${partner}${
        isActive != null ? "&isActive=" + isActive : ""
      }`,
      "get"
    )
      .then((res) => {
        dispatch({
          type: USER_LOCATION_REQUEST,
        });

        dispatch({
          type: USER_LOCATION_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function createLocation(form, cb) {
  return (dispatch) =>
    api(`locations`, "post", form)
      .then((res) => {
        dispatch({
          type: USER_LOCATION_REQUEST,
        });

        dispatch({
          type: USER_LOCATION_ADD_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function deleteLocationById(id, cb) {
  return (dispatch) =>
    api(`locations/${id}`, "put")
      .then((res) => {
        dispatch({
          type: LOCATION_DELETE_REQUEST,
        });

        dispatch({
          type: LOCATION_DELETE_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function updateLocationById(locationID, form, cb) {
  return (dispatch) =>
    api(`locations/${locationID}`, "post", form)
      .then((res) => {
        dispatch({
          type: LOCATION_UPDATE_REQUEST,
        });

        dispatch({
          type: LOCATION_UPDATE_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getLocationById({ id, ...params }, cb) {
  return (dispatch) =>
    api(`locations/${id}`, "get", {}, params)
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

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function likeLocation(locationId, cb) {
  return (dispatch) =>
    api(`locations/${locationId}/like`, "post")
      .then((res) => {
        dispatch({
          type: LOCATION_REVIEW_REQUEST,
        });

        dispatch({
          type: LOCATION_REVIEW_SUCCESS,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}
