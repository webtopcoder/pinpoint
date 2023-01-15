import toast from "@/components/Toast";
import Socket from "socket.io-client";
import { DOMAIN } from "../constants";

import { S_LOGIN } from "./types";

const initialState = {
  socket: Socket(DOMAIN),
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case S_LOGIN: {
      state.socket.emit("login", action.payload);
    }
    default:
      return {
        ...state,
      };
  }
};

export default socketReducer;
