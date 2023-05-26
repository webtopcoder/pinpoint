import {
  LOCATION_FAVORITE_REQUEST,
  LOCATION_FAVORITE_SUCCESS,
  LOCATION_GET_FAVORITE_SUCCESS,
  LOCATION_QUICK_ARRIVAL_SUCCESS,
  LOCATION_QUICK_DEPARTURE_REQUEST,
  LOCATION_QUICK_DEPARTURE_SUCCESS,
  LOCATION_REVIEW_REQUEST,
  LOCATION_REVIEW_SUCCESS,
  LOCATION_CHECKIN_REQUEST,
  LOCATION_CHECKIN_SUCCESS,
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
  favoriteLocations: [],
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
    case LOCATION_REVIEW_REQUEST:
      return { ...state, loading: true };
    case LOCATION_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
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
    case LOCATION_GET_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        favoriteLocations: action.payload,
      };

    case LOCATION_CHECKIN_SUCCESS: {
      return {
        ...state,
        checkIncount: action.payload.count,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default locationReducer;
