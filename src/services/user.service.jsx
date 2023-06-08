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

  function UpdatedNotifications(id) {
    return api(`notification/${id}/mark-as-read`, "post");
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
    clearNotifications
  };
}

export const userService = UserService();