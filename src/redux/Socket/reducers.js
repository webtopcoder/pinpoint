import toast from "@/components/Toast";
import Socket from "socket.io-client";
import { DOMAIN } from "../constants";
import { USER_INFO_SUCCESS } from "../Profile/types";
import { USER_LOGIN_SUCCESS } from "../User/types";

import { S_LOGIN, S_NOTIFICATION } from "./types";

const initialState = {
  socket: Socket(DOMAIN),
  user: "",
  notificationlistener: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case S_LOGIN: {
      state.socket.emit("login", action.payload);
      return state;
    }

    case S_NOTIFICATION: {
      const notificationlistener = `notification-${state.user}`;
      state.socket.on(notificationlistener, (data) => {
        toast({ type: "info", message: data.message });
      });

      /* if (state.notificationlistener != notificationlistener) {
        state.socket.off(state.socket.notificationlistener);
      } */

      return {
        ...state,
        notificationlistener,
      };
    }

    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user.id,
      };
    }

    case USER_INFO_SUCCESS: {
      return {
        ...state,
        user: action.payload.user.id,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default socketReducer;
