import {
    MAIL_COMPOSE_REQUEST,
    MAIL_COMPOSE_SUCCESS,
    GET_INBOX_SUCCESS
} from './types';

const token = '';
const username = '';
const role = '';

if (typeof window !== 'undefined') {
    // Perform localStorage action
    token = sessionStorage.getItem('token');
    username = sessionStorage.getItem('username');
    role = sessionStorage.getItem('role');
}
const initialState = {
    loading: false,
    status: false,
    inboxlist: []
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


        default:
            return {
                ...state,
            };
    }
};

export default mailReducer;