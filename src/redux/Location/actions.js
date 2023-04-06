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
  LOCATION_FAVORITE_REQUEST,
  LOCATION_FAVORITE_SUCCESS,
  LOCATION_GET_FAVORITE_REQUEST,
  LOCATION_GET_FAVORITE_SUCCESS,
  GET_ALL_ACTIVE_LOCATIONS_SUCCESS,
  LOCATION_CHECKIN_REQUEST,
  LOCATION_CHECKIN_SUCCESS,
  USER_EXPIRED_ARRIVAL_REQUEST,
  USER_EXPIRED_ARRIVAL_SUCCESS
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
      `locations?pagination=${pagination}&partner=${partner}${isActive != null ? "&isActive=" + isActive : ""
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
    api(`locations/${id}`, "delete")
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
    api(`locations/${locationID}`, "patch", form)
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

export function getAllLocations(pagination, status, form) {
  let apiquery;
  form?.subcategory?.length > 0
    ? (apiquery = `locations?pagination=${pagination}&isActive=${status}&subCategory=${form?.subcategory ? form.subcategory : ""
      }`)
    : (apiquery = `locations?pagination=${pagination}&isActive=${status}&category=${form?.category ? form.category : ""
      }`);

  return (dispatch) =>
    api(apiquery, "get")
      .then((res) => {
        dispatch({
          type: GET_ALL_ACTIVE_LOCATIONS_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
}
