import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  ADDITION_USER_LOGIN_REQUEST,
  ADDITION_USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOGOUT,
  SUB_CATEGORY_GET_SUCCESS,
  GET_MYFOLLOWER_SUCCESS,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_REQUEST,
  SETTINGS_VALUE_GET_REQUEST,
  PARNTER_SETTINGS_CHANGE,
  SETTINGS_VALUE_GET_SUCCESS,
  GET_FOLLOW_AND_FOLLOWING_SUCCESS,
  CLEAR_NOTIFICATION_REQUEST,
  CLEAR_NOTIFICATION_SUCCESS,
} from "./types";

let token = "";
let username = "";
let role = "";
let usertype = "";
let user_id = "";
let category = "";
let avatar = "";
let additionID = "";
let additionEmail = "";
let additionRole = "";
let additionFlag = "";
let additionLocatoins = [];


if (typeof window !== "undefined") {
  // Perform localStorage action
  token = localStorage.getItem("token");
  username = localStorage.getItem("username");
  role = localStorage.getItem("role");
  user_id = localStorage.getItem("user_id");
  category = localStorage.getItem("category");
  avatar = localStorage.getItem("avatar");
  usertype = localStorage.getItem("usertype");
  additionID = localStorage.getItem("additionID");
  additionEmail = localStorage.getItem("additionEmail");
  additionLocatoins = localStorage.getItem("additionLocatoins");
  additionRole = localStorage.getItem("additionRole");
  additionFlag = localStorage.getItem("additionFlag");
}

const initialState = {
  token: token,
  username: username,
  user_id: user_id,
  category: category,
  role: role,
  usertype: usertype,
  avatar: avatar,
  loading: false,
  status: false,
  additionFlag: additionFlag ?? false,
  additionID: additionID ?? "",
  additionEmail: additionEmail ?? "",
  additionLocatoins: additionLocatoins ?? [],
  additionRole: additionRole ?? "",
  loginInfo: { success: false, msg: {} },
  partnersubCategory: { success: false, subCategories: [] },
  notifications: [],
  notificationCount: 0,
  settings: [],
  myFollowers: [],
  followAndFollowing: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS: {
      localStorage.setItem("token", action?.payload?.tokens?.access?.token);
      localStorage.setItem("role", action?.payload?.user?.role);
      localStorage.setItem("username", action?.payload?.user?.username);
      localStorage.setItem("user_id", action?.payload?.user?._id);
      localStorage.setItem("category", action?.payload?.user?.category);
      localStorage.setItem("usertype", action?.payload?.user?.role);
      localStorage.setItem("additionRole", '');
      localStorage.setItem(
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
        category: action?.payload?.user?.category,
        usertype: action?.payload?.user?.role,
        avatar: action?.payload?.user?.profile?.avatar?.filepath,
      };
    }

    case ADDITION_USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case ADDITION_USER_LOGIN_SUCCESS: {
      localStorage.setItem("token", action?.payload?.tokens?.access?.token);
      localStorage.setItem("role", action?.payload?.user?.owner?.role);
      localStorage.setItem("username", action?.payload?.user?.owner?.username);
      localStorage.setItem("user_id", action?.payload?.user?.owner?._id);
      localStorage.setItem("usertype", action?.payload?.user?.owner?.role);
      localStorage.setItem("additionFlag", true);
      localStorage.setItem("additionID", action.payload.user.id);
      localStorage.setItem("additionEmail", action.payload.user.email);
      localStorage.setItem("additionLocatoins", action.payload.user.locations);
      localStorage.setItem("additionRole", action.payload.user.role);
      localStorage.setItem(
        "avatar",
        action?.payload?.user?.owner?.profile?.avatar?.filepath
          ? action?.payload?.user?.owner?.profile?.avatar?.filepath
          : ""
      );
      return {
        ...state,
        additionFlag: true,
        additionID: action.payload.user.id,
        additionEmail: action.payload.user.email,
        additionLocatoins: action.payload.user.locations,
        additionRole: action.payload.user.role,
        token: action?.payload?.tokens?.access?.token,
        role: action?.payload?.user?.owner?.role,
        username: action?.payload?.user?.owner?.username,
        user_id: action?.payload?.user?.owner?._id,
        usertype: action?.payload?.user?.owner?.role,
        avatar: action?.payload?.user?.owner?.profile?.avatar?.filepath,
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
        myFollowers: action.payload.data.results,
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

    case CLEAR_NOTIFICATION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CLEAR_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        notifications: [],
        notificationCount: 0,
      };
    }

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case LOGOUT: {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
      localStorage.removeItem("user_id");
      localStorage.removeItem("usertype");
      localStorage.removeItem("additionFlag");
      localStorage.removeItem("additionID");
      localStorage.removeItem("additionEmail");
      localStorage.removeItem("additionRole");
      localStorage.removeItem("additionLocatoins");

      return {
        ...state,
        token: null,
        role: "",
        username: "",
        user_id: "",
        usertype: "",
        avatar: "",
        additionFlag: "",
        additionID: "",
        additionEmail: "",
        additionRole: "",
        additionLocatoins: [],
        notifications: [],
        notificationCount: 0,
      };
    }

    case SETTINGS_VALUE_GET_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SETTINGS_VALUE_GET_SUCCESS: {
      return { ...state, settings: action.payload.results };
    }

    case PARNTER_SETTINGS_CHANGE: {
      const settings = state.settings.filter(
        (ob) => ob.key != action.payload.key
      );
      settings.push(action.payload);
      return {
        ...state,
        settings,
      };
    }

    case GET_FOLLOW_AND_FOLLOWING_SUCCESS: {
      return {
        ...state,
        followAndFollowing: action.payload.data,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
