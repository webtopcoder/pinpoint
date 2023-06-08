import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  PARTNERSHIPS_GET_SUCCESS,
  PARTNERSHIP_TRANSACTION_SUCCESS,
  PARTNERSHIP_CANCEL_SUBSCRIBE_REQUEST,
  PARTNERSHIP_CANCEL_SUBSCRIBE_SUCCESS,
} from "./types";

const initialState = {
  userinfo: {},
  partnershipsInfo: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { ...state, loading: true };

    case USER_INFO_SUCCESS: {
      return {
        ...state,
        userinfo: action.payload?.user,
        avatar: action.payload?.user?.profile?.avatar?.filepath,
      };
    }

    case PARTNERSHIPS_GET_SUCCESS: {
      return {
        ...state,
        partnershipsInfo: action.payload.results,
      };
    }

    case PARTNERSHIP_CANCEL_SUBSCRIBE_REQUEST: {
      return { ...state };
    }

    case PARTNERSHIP_CANCEL_SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        userinfo: action.payload.user
      };
    }
    case PARTNERSHIP_TRANSACTION_SUCCESS: {
      return {
        ...state,
        userinfo: action.payload
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default profileReducer;
