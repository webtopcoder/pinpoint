import api from "@/utils/callApi";
import {
  LOCATION_QUICK_ARRIVAL_REQUEST,
  LOCATION_QUICK_ARRIVAL_SUCCESS,
  LOCATION_QUICK_DEPARTURE_REQUEST,
  LOCATION_QUICK_DEPARTURE_SUCCESS,
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
      `locations?pagination=${pagination}&partner=${partner}&isActive=${isActive}`,
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
