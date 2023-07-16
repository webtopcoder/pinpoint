import api from "@/utils/callApi";

function ProfileService() {

  function getInfo() {
    return api(`profile`, "get");
  }

  function getUserInfo() {
    return api(`auth/me`, "get");
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

  function getShoutout(id, count, search) {
    return api(`profile/shoutout/${id}?page=${count}`, "get");
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

  function getAllMemebers(id, count, search) {
    return api(`profile/${id}/getAllMemebers?page=${count}&q=${search}`, "get")
  }

  function onunFriend(id) {
    return api(`follow/${id}/unfriend`, "delete")
  }

  function acceptFollowerRequest(id, type) {
    return api(`follow/accept?id=${id}&type=${type}`, "get")
  }

  function getDashboardInfo() {
    return api(`profile/partner/dashboard`, "get")
  }

  function getDashboardInfoEventhost() {
    return api(`profile/eventhost/dashboard`, "get")
  }

  function getPartnershipplans() {
    return api(`/partnership`, "get")
  }

  function createCustomer() {
    return api(`/partnership/create-customer`, "post")
  }

  function cancelSubscription(data) {
    return api(`/partnership/cancel-subscribe`, "delete", data)
  }

  function Checkout(data) {
    return api(`/partnership/subscribe`, "post", data)
  }

  return {
    getInfo,
    getAllMemebers,
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
    getShoutout,
    onunFriend,
    acceptFollowerRequest,
    getDashboardInfo,
    getUserInfo,
    getPartnershipplans,
    createCustomer,
    cancelSubscription,
    Checkout,
    getDashboardInfoEventhost
  };
}

export const profileService = ProfileService();