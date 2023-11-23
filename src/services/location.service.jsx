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

  function getLocations({ pagination = false, partner, isActive }, params) {
    return api(
      `locations?pagination=${pagination}&partner=${partner}${isActive != null ? "&isActive=" + isActive : ""
      }`,
      "get", {}, params
    )
  }

  function getLocationInfo({ id, expand }) {
    return api(`locations/${id}/${expand}`, "get")
  }

  function AddLocation(data) {
    return api(`locations`, "post", data)
  }

  function UpdateLocationByID(locationID, form) {
    return api(`locations/${locationID}`, "patch", form)
  }

  function DeleteLocation(id) {
    return api(`locations/${id}`, "delete")
  }

  function quickArrival({ form, locationId }) {
    return api(`locations/${locationId}/quick-arrival`, "post", form)
  }

  function quickDeparture({ locationId }) {
    return api(`locations/${locationId}/quick-departure`, "post")
  }

  function favoriteLocation(locationId, flag) {
    return api(`locations/${locationId}/favorite`, flag ? "post" : 'delete')
  }

  function getFavoriteLocations(profile) {
    return api(`locations/favorite/${profile}`, "get")
  }

  function CheckInArrival(arrivalID) {
    return api(`locations/${arrivalID}/check-in`, "post")
  }

  function likeArrival(arrivalID) {
    return api(`locations/${arrivalID}/like`, "post")
  }

  function likeReview(reviewId) {
    return api(`locations/review/${reviewId}/like`, "post")
  }

  function PostReview(locationId, form) {
    return api(`locations/${locationId}/review`, "post", form)
  }

  function votePoll(profileId, locationId, option) {
    return api(`locations/${profileId}/${locationId}/poll`, "post", { option })
  }

  return {
    getAllLocations,
    getLocations,
    AddLocation,
    UpdateLocationByID,
    DeleteLocation,
    quickArrival,
    quickDeparture,
    getLocationInfo,
    favoriteLocation,
    CheckInArrival,
    getFavoriteLocations,
    likeArrival,
    likeReview,
    PostReview,
    votePoll
  };
}

export const locationService = LocationService();