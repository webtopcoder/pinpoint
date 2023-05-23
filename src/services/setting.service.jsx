import api from "@/utils/callApi";

function SettingService() {

  function SettingsToggle(data) {
    return api(`setting`, "post", data);
  }

  function GetSettingsValue() {
    return api(`setting`, "get")
  }

  function deleteAdditionUser(id) {
    return api(`setting/deleteUser/${id}`, "post");
  }

  function updateAdditionalUser(id, data) {
    return api(`setting/updateUser/${id}`, "post", data);
  }

  function getAdditionalUser(id) {
    return api(`setting/getUser/${id}`, "post");
  }


  return {
    SettingsToggle,
    GetSettingsValue,
    deleteAdditionUser,
    updateAdditionalUser,
    getAdditionalUser
  };
}

export const settingService = SettingService();