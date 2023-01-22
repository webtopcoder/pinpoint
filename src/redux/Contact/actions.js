import { CONTACT_REGISTER_REQUEST, CONTACT_REGISTER_SUCCESS } from "./types";
import api from "@/utils/callApi";

export function ContactUser(form, cb) {
  return (dispatch) =>
    api(`contact`, "post", form).then((res) => {
      dispatch({
        type: CONTACT_REGISTER_REQUEST,
      });

      dispatch({
        type: CONTACT_REGISTER_SUCCESS,
        payload: res,
      });

      cb(res);
    });
}
