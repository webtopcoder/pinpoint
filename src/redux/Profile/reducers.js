import {
  ABOUT_CHANGE_SUCCESS,
  GET_ALL_PHOTOS_SUCCESS,
  GET_FOLLOWERS_LIST_SUCCESS,
  GET_SHOOT_OUT_SUCCESS,
  HEADER_GET_SUCCESS,
  NOTIFICATION_CHANGE_SUCCESS,
  POST_FOLLOWER_SUCCESS,
  POST_LIKE_SUCCESS,
  SOCIAL_CHANGE_SUCCESS,
  USER_ACTIVITY_REQUEST,
  USER_ACTIVITY_SUCCESS,
  USER_AVATAR_UPLOAD_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USERINFO_GET_SUCCESS,
  USERPOLL_GET_SUCCESS,
} from "./types";

const initialState = {
  userinfo: [],
  activityInfo: {},
  editInfo: {
    about: "",
    avatar: "",
    social: {},
    notification: {},
  },
  headerInfo: {},
  followersInfo: {},
  shoutoutInfo: {},
  allphotosInfo: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { ...state, loading: true };

    case USER_INFO_SUCCESS: {
      return {
        ...state,
        userinfo: action.payload,
      };
    }

    case USER_ACTIVITY_REQUEST:
      return { ...state, loading: true };

    case USER_ACTIVITY_SUCCESS: {
      return {
        ...state,
        activityInfo: action.payload,
      };
    }

    case USERINFO_GET_SUCCESS: {
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          about: action.payload.about,
          social: action.payload.social,
          notification: action.payload.notification,
        },
      };
    }

    case USERPOLL_GET_SUCCESS: {
      return {
        ...state,
        userPoll: action.payload,
      };
    }

    case HEADER_GET_SUCCESS: {
      return {
        ...state,
        headerInfo: action.payload,
      };
    }

    case ABOUT_CHANGE_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          about: action.payload,
        },
      };
    }

    case SOCIAL_CHANGE_SUCCESS: {
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          social: action.payload,
        },
      };
    }

    case NOTIFICATION_CHANGE_SUCCESS: {
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          notification: action.payload.notification,
        },
      };
    }

    case USER_AVATAR_UPLOAD_SUCCESS: {
      sessionStorage.removeItem("avatar");
      sessionStorage.setItem("avatar", action.payload.avatar);
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          avatar: action.payload.avatar,
        },
      };
    }

    case GET_FOLLOWERS_LIST_SUCCESS: {
      return {
        ...state,
        followersInfo: action.payload.data,
      };
    }

    case GET_ALL_PHOTOS_SUCCESS: {
      return {
        ...state,
        allphotosInfo: action.payload.image,
      };
    }

    case POST_LIKE_SUCCESS: {
      return {
        ...state,
      };
    }

    case GET_SHOOT_OUT_SUCCESS: {
      return {
        ...state,
        shoutoutInfo: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default profileReducer;
