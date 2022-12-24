import {
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_ACTIVITY_REQUEST,
    USER_ACTIVITY_SUCCESS
} from './types';


const initialState = {
    userinfo: [],
    useractivity: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO_REQUEST:
            return { ...state, loading: true };

        case USER_INFO_SUCCESS: {
            return {
                ...state,
                userinfo: action.payload,
            };
        }

        case USER_ACTIVITY_REQUEST:
            return { ...state, loading: true };

        case USER_ACTIVITY_SUCCESS: {
            return {
                ...state,
                useractivity: action.payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
};

export default profileReducer;