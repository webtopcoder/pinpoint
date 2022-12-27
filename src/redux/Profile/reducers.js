import {
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_ACTIVITY_REQUEST,
    USER_ACTIVITY_SUCCESS,
    USERINFO_GET_SUCCESS,
    ABOUT_CHANGE_SUCCESS,
    SOCIAL_CHANGE_SUCCESS,
    NOTIFICATION_CHANGE_SUCCESS,
    USER_AVATAR_UPLOAD_SUCCESS,
    HEADER_GET_SUCCESS,
    POST_FOLLOWER_SUCCESS,
    GET_FOLLOWERS_LIST_SUCCESS
} from './types';


const initialState = {
    userinfo: [],
    activityInfo: {},
    editInfo: {
        about: '',
        avatar: '',
        social: {},
        notification: {}
    },
    headerInfo: {},
    followersInfo: {}
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
                activityInfo: action.payload,
            };
        }

        case USERINFO_GET_SUCCESS: {
            return {
                ...state,
                editInfo: action.payload,
            };
        }

        case HEADER_GET_SUCCESS: {
            return {
                ...state,
                headerInfo: action.payload,
            };
        }

        case ABOUT_CHANGE_SUCCESS: {
            console.log(action.payload)
            return {
                ...state,
                editInfo: {
                    ...state.editInfo,
                    about: action.payload
                },
            };
        }

        case SOCIAL_CHANGE_SUCCESS: {
            return {
                ...state,
                editInfo: {
                    ...state.editInfo,
                    social: action.payload
                },
            };
        }

        case NOTIFICATION_CHANGE_SUCCESS: {
            return {
                ...state,
                editInfo: {
                    ...state.editInfo,
                    notification: action.payload.notification
                },
            };
        }

        case USER_AVATAR_UPLOAD_SUCCESS: {
            return {
                ...state,
                editInfo: {
                    ...state.editInfo,
                    avatar: action.payload.avatar
                },
            };
        }

        case GET_FOLLOWERS_LIST_SUCCESS: {
            return {
                ...state,
                followersInfo: action.payload.data
            };
        }

        default:
            return {
                ...state,
            };
    }
};

export default profileReducer;