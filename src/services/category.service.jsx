import api from "@/utils/callApi";

function CategoryService() {

  function getSubcategory(categoryID) {
    return api(`categories/${categoryID}/subcategories`, "get");
  }

  function getCategory() {
    return api(`categories`, "get");
  }

  function uploadAvatar(data) {
    return api(`profile/avatar`, "post", data);
  }

  function updatePoll(data) {
    return api(`profile/poll`, "patch", data);
  }

  return {
    getSubcategory,
    getCategory,
    uploadAvatar,
    updatePoll,
  };
}

export const categoryService = CategoryService();