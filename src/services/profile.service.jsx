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

  function getAllphotos(id, paginationInfo) {
    return api(
      `profile/${id}/image/all?page=${paginationInfo.pagination.current}&limit=${paginationInfo.pagination.pageSize}`,
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
    getHeader
  };
}

export const profileService = ProfileService();