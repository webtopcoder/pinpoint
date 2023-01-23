import api from "@/utils/callApi";

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
} from "./types";

export function getUserInfo(user_id, cb) {
  return (dispatch) =>
    api(`auth/me`, "get")
      .then((res) => {
        dispatch({
          type: USER_INFO_REQUEST,
        });

        dispatch({
          type: USER_INFO_SUCCESS,
          payload: res,
        });

        cb(res);
      })
      .catch((error) => {
        console.log(error);
      });
}

export function getActivity(id, count, search, cb) {
  return (dispatch) =>
    api(`profile/activity/${id}?page=${count}&search=${search}`, "get")
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
    api(`profile/shootout/${id}?page=${count}&search=${search}`, "get")
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
  console.log(url);
  return (dispatch) =>
    api(`profile/avatar`, "put", url)
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
        };

        if (res.success) {
          data.about = res.data.about;
          data.social = { ...data.social, ...res.data.social };
          data.notification = {
            ...data.notification,
            ...res.data.notification,
          };
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

export function editPoll(form, cb) {
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

export function postThink(info, cb) {
  return (dispatch) =>
    api(`profile/post`, "post", info)
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
    api(`profile/like/${id}`, "put")
      .then((res) => {
        dispatch({
          type: POST_LIKE_SUCCESS,
          payload: res,
        });
        cb(res);
      })
      .catch((error) => {
        console.log(error);
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

export function getAllphotos(id, paginationInfo) {
  console.log(paginationInfo);
  return (dispatch) =>
    api(
      `profile/image/all/${id}?page=${paginationInfo.pagination.current}&pageSize=${paginationInfo.pagination.pageSize}`,
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
        console.log(error);
      });
}

export function getFollowers(id, count, search, cb) {
  return (dispatch) =>
    api(`follow/${id}/follower?page=${count}&search=${search}`, "get")
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

export function unFriend(id, cb) {
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
      });
}
