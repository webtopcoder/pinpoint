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
  function getEventSchedule(filter) {
    // function getEventSchedule({ time, pagination = false, isActive, flag }) {
    return api(

      `event/event-schedule`, "post", filter
      // `event/event-schedule?pagination=${pagination}&time=${time}&flag=${flag}${isActive != null ? "&isActive=" + isActive : ""
    )
  }

  function getEventScheduleByID(id) {
    return api(
      `event/${id}/event-scheduleById`, "post"
    )
  }

  getEventScheduleByID
  function getEvents({ pagination = false, isActive }) {
    return api(
      `event?pagination=${pagination}${isActive != null ? "&isActive=" + isActive : ""
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

  function AddEventSchedule(form) {
    return api(`event/addeventschedule`, "post", form)
  }

  function RequestAccess(id) {
    return api(`event/${id}/request-access`, "post")
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
    PostReview,
    AddEventSchedule,
    getEventSchedule,
    RequestAccess,
    getEventScheduleByID
  };
}

export const eventService = EventService();