import api from "@/utils/callApi";

function LocationService() {

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

  return {
    getInfo,
    updateInfo,
    uploadAvatar,
    updatePoll
  };
}

export const locationService = LocationService();