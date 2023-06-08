import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  ADDITION_USER_LOGIN_REQUEST,
  ADDITION_USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_AVATAR_UPLOAD_SUCCESS,
  LOGOUT,
  GET_MYFOLLOWER_SUCCESS,
} from "./types";

let token = "";
let username = "";
let businessname = "";
let role = "";
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
  businessname = localStorage.getItem("businessname");
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
  businessname: businessname,
  avatar: avatar,
  loading: false,
  status: false,
  additionFlag: additionFlag ?? false,
  additionID: additionID ?? "",
  additionEmail: additionEmail ?? "",
  additionLocatoins: additionLocatoins ?? [],
  additionRole: additionRole ?? "",
  loginInfo: { success: false, msg: {} },
  notifications: [],
  notificationCount: 0,
  myFollowers: [],
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
      localStorage.setItem("businessname", action?.payload?.user?.businessname);
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
        businessname: action?.payload?.user?.businessname,
        avatar: action?.payload?.user?.profile?.avatar?.filepath,
      };
    }

    case ADDITION_USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case ADDITION_USER_LOGIN_SUCCESS: {
      localStorage.setItem("token", action?.payload?.tokens?.access?.token);
      localStorage.setItem("role", action?.payload?.user?.owner?.role);
      localStorage.setItem("username", action?.payload?.user?.owner?.username);
      localStorage.setItem("businessname", action?.payload?.user?.owner?.businessname);
      localStorage.setItem("user_id", action?.payload?.user?.owner?._id);
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
        businessname: action?.payload?.user?.owner?.businessname,
        username: action?.payload?.user?.owner?.username,
        user_id: action?.payload?.user?.owner?._id,
        avatar: action?.payload?.user?.owner?.profile?.avatar?.filepath,
      };
    }

    case GET_MYFOLLOWER_SUCCESS: {
      return {
        ...state,
        myFollowers: action.payload.data.results,
      };
    }

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case LOGOUT: {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("businessname");
      localStorage.removeItem("avatar");
      localStorage.removeItem("user_id");
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
        businessname: "",
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

    case USER_AVATAR_UPLOAD_SUCCESS: {
      localStorage.removeItem("avatar");
      localStorage.setItem("avatar", action.payload.avatar.filepath);
      return {
        ...state,
        avatar: action.payload.avatar.filepath,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
