import api from "@/utils/callApi";

function EventService() {

  // function getAllLocations(pagination, status, form) {
  //   let apiquery;
  //   form?.subcategory?.length > 0
  //     ? (apiquery = `locations?pagination=${pagination}&isActive=${status}&subCategory=${form?.subcategory ? form.subcategory : ""
  //       }`)
  //     : (apiquery = `locations?pagination=${pagination}&isActive=${status}&category=${form?.category ? form.category : ""
  //       }`);
  //   return api(apiquery, "get");
  // }

  function getEvents({ pagination = false, partner, isActive }) {
    return api(
      `event?pagination=${pagination}&partner=${partner}${isActive != null ? "&isActive=" + isActive : ""
      }`,
      "get"
    )
  }

  function getEventInfo({ id, expand }) {
    return api(`event/${id}/${expand}`, "get")
  }

  function AddEvent(data) {
    return api(`event`, "post", data)
  }

  function UpdateEventByID(eventId, form) {
    return api(`event/${eventId}`, "patch", form)
  }

  function DeleteEvent(id) {
    return api(`event/${id}`, "delete")
  }

  function quickArrival({ form, eventId }) {
    return api(`event/${eventId}/quick-arrival`, "post", form)
  }

  function quickDeparture({ eventId }) {
    return api(`event/${eventId}/quick-departure`, "post")
  }

  // function favoriteLocation(locationId, flag) {
  //   return api(`locations/${locationId}/favorite`, flag ? "post" : 'delete')
  // }

  // function getFavoriteLocations(profile) {
  //   return api(`locations/favorite/${profile}`, "get")
  // }

  function CheckInArrival(arrivalID) {
    return api(`event/${arrivalID}/check-in`, "post")
  }

  function likeArrival(arrivalID) {
    return api(`event/${arrivalID}/like`, "post")
  }

  // function likeReview(reviewId) {
  //   return api(`locations/review/${reviewId}/like`, "post")
  // }

  function PostReview(eventId, form) {
    return api(`event/${eventId}/review`, "post", form)
  }

  return {
    // getAllLocations,
    getEvents,
    AddEvent,
    UpdateEventByID,
    DeleteEvent,
    quickArrival,
    quickDeparture,
    getEventInfo,
    CheckInArrival,
    // getFavoriteLocations,
    likeArrival,
    // likeReview,
    PostReview
  };
}

export const eventService = EventService();