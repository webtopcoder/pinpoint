import api from "@/utils/callApi";

function UserService() {

  function getActivepartners() {
    return api(`auth/partners?status=active`, "get");
  }

  function getTestimonials() {
    return api(`admin/testimonial/all`, "get")
  }

  function getNewpartners() {
    return api(`admin/newpartners/all`, "get")
  }

  function submitContact(data) {
    return api(`contact`, "post", data)
  }

  function getNotifications(params) {
    return api(`notification`, "get", {}, params);
  }

  function UpdatedNotifications(id, flag) {
    return api(`notification/${id}/${flag}/update`, "post");
  }

  function notificationUpdateAll(flag) {
    return api(`notification/${flag}/updateAll`, "post");
  }

  function clearNotifications() {
    return api(`notification/clear`, "get")
  }

  return {
    getActivepartners,
    getTestimonials,
    submitContact,
    getNewpartners,
    getNotifications,
    UpdatedNotifications,
    clearNotifications,
    notificationUpdateAll
  };
}

export const userService = UserService();