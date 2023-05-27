import api from "@/utils/callApi";

function SettingService() {

  function SettingsToggle(data) {
    return api(`setting`, "post", data);
  }

  function GetSettingsValue() {
    return api(`setting`, "get")
  }

  function getPartners(email) {
    return api(`setting/getPartners/${email}`, "post")
  }

  function getPartnerInfo() {
    return api(`auth/me`, "get")
  }

  function deleteAdditionUser(id) {
    return api(`setting/deleteUser/${id}`, "post");
  }

  function updateAdditionalUser(id, data) {
    return api(`setting/updateUser/${id}`, "post", data);
  }

  function updateAdditionalWithPassword(data) {
    return api(`setting/updateUserWithPassword`, "post", data);
  }

  function getAdditionalUser(id) {
    return api(`setting/getUser/${id}`, "post");
  }

  function loginAdditionUser(data) {
    return api(`setting/loginUser`, "post", data);
  }

  function partnerProfileUpdate(data) {
    return api(`profile`, "patch", data);
  }

  return {
    SettingsToggle,
    GetSettingsValue,
    deleteAdditionUser,
    updateAdditionalUser,
    getAdditionalUser,
    updateAdditionalWithPassword,
    loginAdditionUser,
    getPartners,
    partnerProfileUpdate,
    getPartnerInfo
  };
}

export const settingService = SettingService();