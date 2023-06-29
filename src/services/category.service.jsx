import api from "@/utils/callApi";

function CategoryService() {

  function getSubcategory(categoryID) {
    return api(`categories/${categoryID}/subcategories`, "get");
  }

  function getCategory() {
    return api(`categories`, "get");
  }

  function getCategoryByID(id) {
    return api(`categories/${id}`, "get");
  }

  return {
    getSubcategory,
    getCategory,
    getCategoryByID,
  };
}

export const categoryService = CategoryService();