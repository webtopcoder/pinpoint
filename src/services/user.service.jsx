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

  return {
    getActivepartners,
    getTestimonials,
    submitContact,
    getNewpartners
  };
}

export const userService = UserService();