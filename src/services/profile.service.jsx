import api from "@/utils/callApi";

function ProfileService() {

  function getInfo() {
    return api(`profile`, "get");
  }

  function updateInfo(data) {
    return api(`profile/edit`, "patch", data)
  }

  function uploadAvatar(data) {
    return api(`profile/avatar`, "post", data)
  }

  function updatePoll(data) {
    return api(`profile/poll`, "patch", data)
  }

  function recommendPost(id) {
    return api(`post/${id}/like`, "post");
  }

  function recommendComment(id) {
    return api(`profile/comment/${id}/like`, "post");
  }

  function getComments(typeId) {
    return api(`profile/comment/${typeId}`, "get");
  }

  function createComment(formData) {
    return api(`profile/comment`, "post", formData);
  }

  function deleteComment(formData) {
    return api(`profile/comment`, "delete", formData);
  }

  function updateComment(formData) {
    return api(`profile/comment`, "patch", formData);
  }

  function getAllphotos(id, paginationInfo) {
    return api(
      `profile/${id}/image/all?page=${paginationInfo.current}&limit=${paginationInfo.pageSize}`,
      "get"
    )
  }

  function updateProfileViewsCount(id) {
    return api(`/profile/updateProfileView/${id}`, "get");
  }

  function getmyFollowers(id, count, search) {
    return api(`follow/${id}/follower?page=${count}&q=${search}`, "get")

  }

  function getFollowerAndFollowings() {
    return api(`follow`, "get")
  }

  function getActivity(id, count, search) {
    return api(`profile/${id}/activity?page=${count}&search=${search}`, "get");
  }

  function postThink({ userId, formData }) {
    return api(`profile/${userId}/post`, "post", formData);
  }

  function getProfilePoll(id) {
    return api(`profile/${id}/poll`, "get");
  }

  function votePoll(id, option) {
    return api(`profile/${id}/poll`, "post", { option })
  }

  function postFollower(id) {
    return api(`follow/${id}`, "post")
  }

  function deleteFollower(id) {
    return api(`follow/${id}`, "delete")
  }

  function getHeader(id) {
    return api(`profile/${id}/header`, "get")
  }


  return {
    getInfo,
    updateInfo,
    uploadAvatar,
    updatePoll,
    recommendPost,
    getAllphotos,
    updateProfileViewsCount,
    getmyFollowers,
    getFollowerAndFollowings,
    getActivity,
    postThink,
    getProfilePoll,
    votePoll,
    postFollower,
    deleteFollower,
    getHeader,
    getComments,
    createComment,
    deleteComment,
    updateComment,
    recommendComment,
  };
}

export const profileService = ProfileService();