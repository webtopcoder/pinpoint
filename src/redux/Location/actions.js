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
} from "./types";

export function quickArrival(form, cb) {
  return (dispatch) =>
    api(`locations/${form.locationId}/quick-arrival`, "post", {
      departureAt: form.departureAt,
      arrivalText: form.arrivalText,
    })
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
