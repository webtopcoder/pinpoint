import {
  LOCATION_QUICK_ARRIVAL_SUCCESS,
  LOCATION_QUICK_DEPARTURE_REQUEST,
  LOCATION_QUICK_DEPARTURE_SUCCESS,
} from "./types";

const initialState = {
  loading: true,
  userLocation: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_QUICK_DEPARTURE_REQUEST:
      return { ...state, loading: true };
    case LOCATION_QUICK_DEPARTURE_REQUEST:
      return { ...state, loading: true };
    case LOCATION_QUICK_ARRIVAL_SUCCESS:
      return { ...state, loading: false, userLocation: action.payload };
    case LOCATION_QUICK_DEPARTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        userLocation: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default locationReducer;
