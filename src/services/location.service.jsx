import api from "@/utils/callApi";

function LocationService() {

  function getAllLocations(pagination, status, form) {
    let apiquery;
    form?.subcategory?.length > 0
      ? (apiquery = `locations?pagination=${pagination}&isActive=${status}&subCategory=${form?.subcategory ? form.subcategory : ""
        }`)
      : (apiquery = `locations?pagination=${pagination}&isActive=${status}&category=${form?.category ? form.category : ""
        }`);
    return api(apiquery, "get");
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
    getAllLocations,
    updateInfo,
    uploadAvatar,
    updatePoll
  };
}

export const locationService = LocationService();