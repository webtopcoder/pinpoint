import {
  LOCATION_FAVORITE_REQUEST,
  LOCATION_FAVORITE_SUCCESS,
  LOCATION_QUICK_ARRIVAL_SUCCESS,
  LOCATION_QUICK_DEPARTURE_REQUEST,
  LOCATION_QUICK_DEPARTURE_SUCCESS,
  USER_LOCATION_ID_SUCCESS,
  USER_LOCATION_REQUEST,
  USER_EXPIRED_ARRIVAL_REQUEST,
  USER_EXPIRED_ARRIVAL_SUCCESS,
} from "./types";

const initialState = {
  loading: true,
  userLocations: [],
  activeLocations: [],
  expiredArrivals: [],
  location: {
    isFavorite: false,
  },
  checkIncount: 0,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_QUICK_DEPARTURE_REQUEST:
      return { ...state, loading: true };
    case LOCATION_QUICK_DEPARTURE_REQUEST:
      return { ...state, loading: true };
    case LOCATION_QUICK_ARRIVAL_SUCCESS:
      return { ...state, loading: false };
    case LOCATION_QUICK_DEPARTURE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USER_LOCATION_REQUEST:
      return { ...state, loading: true };

    case USER_LOCATION_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        location: { ...action.payload.location, isFavorite: action.payload.isFavorite },
        expiredArrivals: action.payload.expiredArrival,
        checkIncount: action.payload.location.isArrival?.checkIn?.length
      };

    case USER_EXPIRED_ARRIVAL_REQUEST:
      return { ...state, loading: true };
    case USER_EXPIRED_ARRIVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        expiredArrivals: action.payload,
      };
    case LOCATION_FAVORITE_REQUEST:
      return { ...state, loading: true };
    case LOCATION_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        location: {
          ...state.location,
          isFavorite: action.payload ?? state.location.isFavorite,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default locationReducer;
