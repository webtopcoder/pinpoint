import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOGOUT,
  USER_REGISTER_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  SUB_CATEGORY_GET_SUCCESS,
  GET_MYFOLLOWER_SUCCESS,
  USER_EMAIL_VERIFICATION_REQUEST,
  USER_EMAIL_VERIFICATION_SUCCESS,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_REQUEST,
} from "./types";

let token = "";
let username = "";
let role = "";
let usertype = "";
let user_id = "";
let avatar = "";

if (typeof window !== "undefined") {
  // Perform localStorage action
  token = sessionStorage.getItem("token");
  username = sessionStorage.getItem("username");
  role = sessionStorage.getItem("role");
  user_id = sessionStorage.getItem("user_id");
  avatar = sessionStorage.getItem("avatar");
  usertype = sessionStorage.getItem("usertype");
}

const initialState = {
  token: token,
  username: username,
  user_id: user_id,
  role: role,
  usertype: usertype,
  avatar: avatar,
  loading: false,
  status: false,
  loginInfo: { success: false, msg: {} },
  resetPasswordInfo: { success: false, msg: "" },
  partnerCategory: { success: false, categories: [] },
  partnersubCategory: { success: false, subCategories: [] },
  myFollowers: [],
  notifications: [],
  notificationCount: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS: {
      sessionStorage.setItem("token", action?.payload?.tokens?.access?.token);
      sessionStorage.setItem("role", action?.payload?.user?.role);
      sessionStorage.setItem("username", action?.payload?.user?.username);
      sessionStorage.setItem("user_id", action?.payload?.user?._id);
      sessionStorage.setItem("usertype", action?.payload?.user?.role);
      sessionStorage.setItem(
        "avatar",
        action?.payload?.user?.profile?.avatar?.filepath
          ? action?.payload?.user?.profile?.avatar?.filepath
          : ""
      );
      return {
        ...state,
        token: action?.payload?.tokens?.access?.token,
        role: action?.payload?.user?.role,
        username: action?.payload?.user?.username,
        user_id: action?.payload?.user?._id,
        usertype: action?.payload?.user?.role,
        avatar: action?.payload?.user?.profile?.avatar?.filepath,
      };
    }
    case USER_EMAIL_VERIFICATION_REQUEST:
      return { ...state, loading: true };
    case USER_EMAIL_VERIFICATION_SUCCESS: {
      return {
        ...state,
        status: action.payload.success,
      };
    }
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordInfo: action.payload,
      };
    }

    case CATEGORY_GET_REQUEST:
      return { ...state, loading: true };

    case CATEGORY_GET_SUCCESS: {
      return {
        ...state,
        partnerCategory: action.payload,
      };
    }

    case SUB_CATEGORY_GET_SUCCESS: {
      return {
        ...state,
        partnersubCategory: action.payload,
      };
    }

    case GET_MYFOLLOWER_SUCCESS: {
      return {
        ...state,
        myFollowers: action.payload.followers,
      };
    }

    case GET_NOTIFICATION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        notifications: action.payload.results,
        notificationCount: action.payload.totalResults,
      };
    }

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case LOGOUT: {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("avatar");
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("usertype");
      return {
        ...state,
        token: null,
        role: "",
        username: "",
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        status: action.payload.success,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
