import {
    MAIL_COMPOSE_REQUEST,
    MAIL_COMPOSE_SUCCESS,
    GET_INBOX_SUCCESS,
    GET_SENT_SUCCESS
} from './types';

const initialState = {
    loading: false,
    status: false,
    inboxlist: [],
    sentlist: [],
    senttotal: 0
}

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
                inboxlist: action.payload,
            };
        }

          case GET_SENT_SUCCESS: {

            return {
                ...state,
                sentlist: action.payload.data,
                senttotal: action.payload.total
            };
        }

        default:
            return {
                ...state,
            };
    }
};

export default mailReducer;