import {
  LOCATION_FAVORITE_REQUEST,
  LOCATION_FAVORITE_SUCCESS,
  LOCATION_GET_FAVORITE_SUCCESS,
  LOCATION_QUICK_ARRIVAL_SUCCESS,
  LOCATION_QUICK_DEPARTURE_REQUEST,
  LOCATION_QUICK_DEPARTURE_SUCCESS,
  LOCATION_REVIEW_REQUEST,
  LOCATION_REVIEW_SUCCESS,
  USER_LOCATION_ADD_SUCCESS,
  USER_LOCATION_ID_SUCCESS,
  USER_LOCATION_REQUEST,
  USER_LOCATION_SUCCESS,
  GET_ALL_ACTIVE_LOCATIONS_SUCCESS
} from "./types";

const initialState = {
  loading: true,
  userLocations: [],
  activeLocations: [],
  location: {
    isFavorite: false,
  },
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
    case USER_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        userLocations: action.payload.results,
      };
    case USER_LOCATION_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USER_LOCATION_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        location: action.payload,
      };
    case LOCATION_REVIEW_REQUEST:
      return { ...state, loading: true };
    case LOCATION_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
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
    case GET_ALL_ACTIVE_LOCATIONS_SUCCESS: {

      return {
        ...state,
        activeLocations: action.payload.results,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default locationReducer;
