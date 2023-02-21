import api from "@/utils/callApi";
import { S_LOGIN, S_NOTIFICATION } from "../Socket/types";
import { LOGOUT } from "../User/types";

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
  THINK_POST_SUCCESS,
  UN_FRIEND_SUCCESS,
  USER_ACTIVITY_REQUEST,
  USER_ACTIVITY_SUCCESS,
  USER_AVATAR_UPLOAD_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_UPDATE_INFO_REQUEST,
  USER_UPDATE_INFO_SUCCESS,
  USERINFO_GET_REQUEST,
  USERINFO_GET_SUCCESS,
  USERPOLL_GET_SUCCESS,
  PARTNERSHIPS_GET_REQUEST,
  PARTNERSHIPS_GET_SUCCESS,
  PARNTER_SETTINGS_CHANGE,
  BUSINESS_UPDATE_INFO_REQUEST,
  BUSINESS_UPDATE_INFO_SUCCESS,
  PROFILE_POLL_SUCCESS,
  PARTNERSHIP_SUBSCRIBE_REQUEST,
  PARTNERSHIP_SUBSCRIBE_SUCCESS,
  PARTNERSHIP_CREATE_CUSTOMER_REQUEST,
  PARTNERSHIP_CREATE_CUSTOMER_SUCCESS,
  PARTNERSHIP_TRANSACTION_SUCCESS,
  PARTNERSHIP_CANCEL_SUBSCRIBE_REQUEST,
  PARTNERSHIP_CANCEL_SUBSCRIBE_SUCCESS,
  DASHBOARD_GET_SUCCESS,
} from "./types";

export function getUserInfo(cb) {
  return (dispatch) =>
    api(`auth/me`, "get")
      .then((res) => {
        dispatch({
          type: S_LOGIN,
          payload: res.user.id,
        });

        dispatch({
          type: USER_INFO_REQUEST,
        });

        dispatch({
          type: USER_INFO_SUCCESS,
          payload: res,
        });

        dispatch({
          type: S_NOTIFICATION,
        });

        cb(res);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          dispatch({
            type: LOGOUT,
          });
        }
        cb(null, error);
        console.clear();
      });
}
export function createCustomer(cb) {
  return (dispatch) => {
    api(`/partnership/create-customer`, "post")
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_CREATE_CUSTOMER_REQUEST,
        });
        dispatch({
          type: PARTNERSHIP_CREATE_CUSTOMER_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}
export function subscribe(data, cb) {
  return (dispatch) => {
    api(`/partnership/subscribe`, "post", data)
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_SUBSCRIBE_REQUEST,
        });
        dispatch({
          type: PARTNERSHIP_SUBSCRIBE_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}
export function cancelSubscription(data, cb) {
  return (dispatch) => {
    api(`/partnership/cancel-subscribe`, "delete", data)
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_CANCEL_SUBSCRIBE_REQUEST,
        });
        dispatch({
          type: PARTNERSHIP_CANCEL_SUBSCRIBE_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}

export function postTransaction(data, cb) {
  return (dispatch) => {
    api(`/partnership/create-transaction`, "post", data)
      .then((res) => {
        dispatch({
          type: PARTNERSHIP_TRANSACTION_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}
export function getPartnerships(cb) {
  return (dispatch) => {
    api(`/partnership`, "get")
      .then((res) => {
        dispatch({
          type: PARTNERSHIPS_GET_REQUEST,
        });
        dispatch({
          type: PARTNERSHIPS_GET_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
        console.log(error);
      });
  };
}

export function getActivity(id, count, search, cb) {
  return (dispatch) =>
    api(`profile/${id}/activity?page=${count}&search=${search}`, "get")
      .then((res) => {
        dispatch({
          type: USER_ACTIVITY_REQUEST,
        });

        dispatch({
          type: USER_ACTIVITY_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getShoutout(id, count, search, cb) {
  return (dispatch) =>
    api(`profile/shoutout/${id}?page=${count}`, "get")
      .then((res) => {
        dispatch({
          type: GET_SHOOT_OUT_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function updateInfo(info, cb) {
  return (dispatch) =>
    api(`profile/edit`, "patch", info)
      .then((res) => {
        dispatch({
          type: USER_UPDATE_INFO_REQUEST,
        });

        dispatch({
          type: USER_UPDATE_INFO_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function uploadAvatar(url, cb) {
  return (dispatch) =>
    api(`profile/avatar`, "post", url)
      .then((res) => {
        dispatch({
          type: USER_AVATAR_UPLOAD_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getInfo() {
  return (dispatch) =>
    api(`profile`, "get")
      .then((res) => {
        const data = {
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
        };

        if (res.success) {
          data.about = res.data.about;
          data.social = { ...data.social, ...res.data.social };
          data.notification = {
            ...data.notification,
            ...res.data.notification,
          };
          data.avatar = res.data.avatar?.filepath;
          data.poll = res.data.poll;
        }

        dispatch({
          type: USERINFO_GET_REQUEST,
        });

        dispatch({
          type: USERINFO_GET_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
}

export function editAbout(value) {
  return (dispatch) =>
    dispatch({
      type: ABOUT_CHANGE_SUCCESS,
      payload: value,
    });
}

export function editSocial(form) {
  return (dispatch) =>
    dispatch({
      type: SOCIAL_CHANGE_SUCCESS,
      payload: form,
    });
}

export function editPoll(form) {
  return (dispatch) =>
    dispatch({
      type: USERPOLL_GET_SUCCESS,
      payload: form,
    });
}

export function addPoll(form, cb) {
  return (dispatch) =>
    api(`profile/poll`, "patch", form)
      .then((res) => {
        dispatch({
          type: USERPOLL_GET_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function editNotification(rating, follow, mention, favorite) {
  const data = {
    notification: {
      rating: rating,
      follow: follow,
      mention: mention,
      favorite: favorite,
    },
  };

  api(`profile/edit`, "patch", data);

  return (dispatch) =>
    dispatch({
      type: NOTIFICATION_CHANGE_SUCCESS,
      payload: data,
    });
}

export function postThink({ userId, formData }, cb) {
  return (dispatch) =>
    api(`profile/${userId}/post`, "post", formData)
      .then((res) => {
        dispatch({
          type: THINK_POST_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function recommendPost(id, cb) {
  return (dispatch) =>
    api(`post/${id}/like`, "post")
      .then((res) => {
        dispatch({
          type: POST_LIKE_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        console.log(error);
        cb(null, error);
      });
}

export function getHeader(id) {
  return (dispatch) =>
    api(`profile/${id}/header`, "get")
      .then((res) => {
        dispatch({
          type: HEADER_GET_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getProfilePoll(id) {
  return (dispatch) =>
    api(`profile/${id}/poll`, "get")
      .then((res) => {
        dispatch({
          type: PROFILE_POLL_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
}

export function votePoll(id, option, cb) {
  return (dispatch) =>
    api(`profile/${id}/poll`, "post", { option })
      .then((res) => {
        dispatch({
          type: PROFILE_POLL_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
        cb(null, error);
      });
}

export function getAllphotos(id, paginationInfo) {
  console.log(paginationInfo);
  return (dispatch) =>
    api(
      `profile/${id}/image/all?page=${paginationInfo.pagination.current}&limit=${paginationInfo.pagination.pageSize}`,
      "get"
    )
      .then((res) => {
        dispatch({
          type: GET_ALL_PHOTOS_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
}

export function postFollower(id, cb) {
  return (dispatch) =>
    api(`follow/${id}`, "post")
      .then((res) => {
        dispatch({
          type: POST_FOLLOWER_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getFollowers(id, count, search, cb) {
  return (dispatch) =>
    api(`follow/${id}/follower?page=${count}&q=${search}`, "get")
      .then((res) => {
        dispatch({
          type: GET_FOLLOWERS_LIST_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function unfollow(id, cb) {
  return (dispatch) =>
    api(`follow/${id}`, "delete")
      .then((res) => {
        dispatch({
          type: UN_FRIEND_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        console.log(error);
        cb(null, error);
      });
}

export function unFriend(id, cb) {
  return (dispatch) =>
    api(`follow/${id}/unfriend`, "delete")
      .then((res) => {
        dispatch({
          type: UN_FRIEND_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        console.log(error);
        cb(null, error);
      });
}

export function updateBusinessDetail(info, cb) {
  return (dispatch) =>
    api(`profile`, "patch", info)
      .then((res) => {
        dispatch({
          type: BUSINESS_UPDATE_INFO_REQUEST,
        });

        dispatch({
          type: BUSINESS_UPDATE_INFO_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
}

export function getDashboardInfo(cb) {
  return (dispatch) => {
    api(`profile/partner/dashboard`, "get")
      .then((res) => {
        dispatch({
          type: DASHBOARD_GET_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        cb(null, error);
      });
  };
}
