import api from "@/utils/callApi";

function SettingService() {

  function SettingsToggle(data) {
    return api(`setting`, "post", data);
  }

  function GetSettingsValue() {
    return api(`setting`, "get")
  }

  return {
    SettingsToggle,
    GetSettingsValue
  };
}

export const settingService = SettingService();