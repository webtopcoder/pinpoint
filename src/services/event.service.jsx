import api from "@/utils/callApi";

function EventService() {

  function getEventSchedule(filter) {
    return api(
      `event/event-schedule`, "post", filter
    )
  }

  function getEventScheduleByID(id) {
    return api(
      `event/${id}/event-scheduleById`, "post"
    )
  }

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

  function deleteEventSchedule(id) {
    return api(`event/${id}/eventschedule`, "delete")
  }

  function CheckInArrival(arrivalID) {
    return api(`event/${arrivalID}/check-in`, "post")
  }

  function likeArrival(arrivalID) {
    return api(`event/${arrivalID}/like`, "post")
  }

  function PostReview(eventId, form) {
    return api(`event/${eventId}/review`, "post", form)
  }

  function AddEventSchedule(form) {
    return api(`event/addeventschedule`, "post", form)
  }

  function RequestAccess(id) {
    return api(`event/${id}/request-access`, "post")
  }

  function RequestAccessManually(id, data) {
    return api(`event/${id}/request-access-manually`, "post", data)
  }

  function markStatus(id, data) {
    return api(`event/${id}/markStatus`, "post", data)
  }

  function uploadExcel(scheduleId, data) {
    return api(`event/${scheduleId}/uploadExcel`, "post", data)
  }

  return {
    markStatus,
    getEvents,
    AddEvent,
    UpdateEventByID,
    DeleteEvent,
    quickArrival,
    quickDeparture,
    getEventInfo,
    CheckInArrival,
    likeArrival,
    uploadExcel,
    PostReview,
    AddEventSchedule,
    getEventSchedule,
    RequestAccess,
    RequestAccessManually,
    getEventScheduleByID,
    deleteEventSchedule
  };
}

export const eventService = EventService();