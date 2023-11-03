import {
  MAIL_COMPOSE_REQUEST,
  MAIL_COMPOSE_SUCCESS,
  GET_INBOX_SUCCESS,
  GET_SENT_SUCCESS,
  GET_NOTICE_REQUEST,
  GET_PENDING_REQUEST,
  GET_PENDING_SUCCESS,
  GET_NOTICE_SUCCESS,
  UPDATE_MAIL_REQUEST,
  UPDATE_MAIL_SUCCESS,
  DELETE_MAIL_SUCCESS,
  DELETE_MAIL_REQUEST,
  GET_ISREAD_SUCCESS,
  DELETE_SENT_MAIL_SUCCESS
} from "./types";

const initialState = {
  loading: false,
  status: false,
  inboxlist: [],
  sentlist: [],
  noticelist: [],
  pendinglist: [],
  isreadlist: [],
  senttotal: 0,
  pendingtotal: 0,
};

const mailReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIL_COMPOSE_REQUEST:
      return { ...state, loading: true };

    case MAIL_COMPOSE_SUCCESS: {
      return {
        ...state,
      };
    }

    case GET_INBOX_SUCCESS: {
      return {
        ...state,
        inboxlist: action.payload.results,
      };
    }

    case GET_SENT_SUCCESS: {
      return {
        ...state,
        sentlist: action.payload.results,
      };
    }

    case DELETE_SENT_MAIL_SUCCESS: {
      return {
        ...state,
        sentlist: action.payload.results,
      };
    }

    case GET_NOTICE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_NOTICE_SUCCESS: {
      return {
        ...state,
        noticelist: action.payload.results,
        loading: false,
      };
    }

    case GET_PENDING_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_PENDING_SUCCESS: {
      return {
        ...state,
        pendinglist: action.payload.results,
        pendingtotal: action.payload.totalResults,
        loading: false,
      };
    }

    case GET_ISREAD_SUCCESS: {
      return {
        ...state,
        isreadlist: action.payload.results,
        loading: false,
      };
    }

    case UPDATE_MAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case UPDATE_MAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case DELETE_MAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case DELETE_MAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default mailReducer;
