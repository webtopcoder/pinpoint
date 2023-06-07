import {
  ABOUT_CHANGE_SUCCESS,
  NOTIFICATION_CHANGE_SUCCESS,
  SOCIAL_CHANGE_SUCCESS,
  USER_AVATAR_UPLOAD_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USERINFO_GET_SUCCESS,
  USERPOLL_GET_SUCCESS,
  PARTNERSHIPS_GET_SUCCESS,
  PROFILE_POLL_SUCCESS,
  PARTNERSHIP_TRANSACTION_SUCCESS,
  PARTNERSHIP_CANCEL_SUBSCRIBE_REQUEST,
  PARTNERSHIP_CANCEL_SUBSCRIBE_SUCCESS,
} from "./types";

const initialState = {
  userinfo: {},
  editInfo: {
    about: "",
    social: {
      facebook: "",
      twitter: "",
      tiktok: "",
      website: "",
      snapchat: "",
      instagram: "",
    },
    notification: {
      rate: false,
      follow: false,
      mention: false,
      favorite: false,
    },
    avatar: "",
    poll: {
      question: "",
      options: [],
      votes: [0, 0, 0, 0],
    },
  },
  partnershipsInfo: [],
  profilePoll: {
    question: "",
    options: [],
    votes: [0, 0, 0, 0],
  },
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

    case USERINFO_GET_SUCCESS: {
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          about: action.payload.about,
          social: action.payload.social,
          notification: action.payload.notification,
          avatar: action.payload.avatar,
          poll: {
            ...state.editInfo.poll,
            question: action.payload.poll?.question ?? "",
            options: action.payload.poll?.options ?? [],
            votes: action.payload.poll?.votes ?? Array(4).fill(0),
          },
        },
      };
    }

    case USERPOLL_GET_SUCCESS: {
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          poll: {
            ...state.editInfo.poll,
            question: action.payload.question,
            options: action.payload.options,
            votes: action.payload.votes,
          },
        },
      };
    }

    case PROFILE_POLL_SUCCESS: {
      return {
        ...state,
        profilePoll: {
          ...state.profilePoll,
          question: action.payload.question,
          options: action.payload.options,
          votes: action.payload.votes,
        },
      };
    }

    case ABOUT_CHANGE_SUCCESS: {
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
      localStorage.removeItem("avatar");
      localStorage.setItem("avatar", action.payload.avatar.filepath);
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          avatar: action.payload.avatar.filepath,
        },
        userinfo: {
          ...state.userinfo,
          profile: {
            ...state.userinfo.profile,
            avatar: action.payload.avatar,
          },
        },
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
