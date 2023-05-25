import api from "@/utils/callApi";

function CategoryService() {

  function getSubcategory(categoryID) {
    return api(`categories/${categoryID}/subcategories`, "get");
  }

  function getCategory() {
    return api(`categories`, "get");
  }

  return {
    getSubcategory,
    getCategory,
  };
}

export const categoryService = CategoryService();