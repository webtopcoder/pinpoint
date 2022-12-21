import {
    MAIL_COMPOSE_REQUEST,
    MAIL_COMPOSE_SUCCESS
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

        default:
            return {
                ...state,
            };
    }
};

export default mailReducer;