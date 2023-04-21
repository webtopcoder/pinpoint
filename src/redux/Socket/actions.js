import { NOTIFICATION_VIEWED } from "./types";

export function viewedNotification() {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATION_VIEWED,
    });
  };
}
