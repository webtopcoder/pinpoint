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

  function getLocations({ pagination = false, partner, isActive }) {
    return api(
      `locations?pagination=${pagination}&partner=${partner}${isActive != null ? "&isActive=" + isActive : ""
      }`,
      "get"
    )
  }

  return {
    getAllLocations,
    getLocations
  };
}

export const locationService = LocationService();