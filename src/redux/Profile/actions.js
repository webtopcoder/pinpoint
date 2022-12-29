import {
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_ACTIVITY_REQUEST,
    USER_ACTIVITY_SUCCESS,
    USER_UPDATE_INFO_REQUEST,
    USER_UPDATE_INFO_SUCCESS,
    USERINFO_GET_REQUEST,
    USERINFO_GET_SUCCESS,
    ABOUT_CHANGE_SUCCESS,
    SOCIAL_CHANGE_SUCCESS,
    NOTIFICATION_CHANGE_SUCCESS,
    USER_AVATAR_UPLOAD_SUCCESS,
    THINK_POST_SUCCESS,
    HEADER_GET_SUCCESS,
    POST_FOLLOWER_SUCCESS,
    GET_FOLLOWERS_LIST_SUCCESS,
    UN_FRIEND_SUCCESS

} from './types';
import api from '@/utils/callApi'

export function getUserInfo(user_id, cb) {
    return dispatch => api(`auth/user/login`, 'get', user_id).then(
        res => {

            dispatch({
                type: USER_INFO_REQUEST,
            });

            dispatch({
                type: USER_INFO_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function getActivity(id, count, search, cb) {

    return dispatch => api(`profile/activity/${id}?page=${count}&search=${search}`, 'get').then(
        res => {

            dispatch({
                type: USER_ACTIVITY_REQUEST,
            });

            dispatch({
                type: USER_ACTIVITY_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function updateInfo(info, cb) {
    return dispatch => api(`profile/edit`, 'put', info).then(
        res => {
            dispatch({
                type: USER_UPDATE_INFO_REQUEST,
            });

            dispatch({
                type: USER_UPDATE_INFO_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function uploadAvatar(url, cb) {
    console.log(url)
    return dispatch => api(`profile/avatar`, 'put', url).then(
        res => {
            dispatch({
                type: USER_AVATAR_UPLOAD_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function getInfo() {
    return dispatch => api(`profile`, 'get').then(

        res => {
            const data = {
                about: '',
                social: {
                    facebook: '',
                    twitter: '',
                    tiktok: '',
                    website: '',
                    snapchat: '',
                    instagram: '',
                },
                notification: {
                    rate: false,
                    follow: false,
                    mention: false,
                    favorite: false
                }
            }

            if (res.success) {
                res.data.about ? data.about = res.data.about : data.about;
                if (res.data.social) {
                    res.data.social.facebook ? data.social.facebook = res.data.social.facebook : data.social.facebook;
                    res.data.social.twitter ? data.social.twitter = res.data.social.twitter : data.social.twitter;
                    res.data.social.tiktok ? data.social.tiktok = res.data.social.tiktok : data.social.tiktok;
                    res.data.social.snapchat ? data.social.snapchat = res.data.social.snapchat : data.social.snapchat;
                    res.data.social.website ? data.social.website = res.data.social.website : data.social.website;
                    res.data.social.instagram ? data.social.instagram = res.data.social.instagram : data.social.instagram;
                }
                if (res.data.notification) {
                    res.data.notification.rate ? data.notification.rate = res.data.notification.rate : data.notification.rate;
                    res.data.notification.follow ? data.notification.follow = res.data.notification.follow : data.notification.follow;
                    res.data.notification.mention ? data.notification.mention = res.data.notification.mention : data.notification.mention;
                    res.data.notification.favorite ? data.notification.favorite = res.data.notification.favorite : data.notification.favorite;
                }
            }

            dispatch({
                type: USERINFO_GET_REQUEST,
            });

            dispatch({
                type: USERINFO_GET_SUCCESS,
                payload: data,
            });
        }).catch(error => {
            console.log(error);
        })
}

export function editAbout(value) {

    return dispatch =>
        dispatch({
            type: ABOUT_CHANGE_SUCCESS,
            payload: value,
        })
}

export function editSocial(form) {

    return dispatch =>
        dispatch({
            type: SOCIAL_CHANGE_SUCCESS,
            payload: form,
        })
}

export function editNotification(rating, follow, mention, favorite) {
    const data = {
        notification: {
            rating: rating,
            follow: follow,
            mention: mention,
            favorite: favorite
        }
    }

    api(`profile/edit`, 'put', data)

    return dispatch =>
        dispatch({
            type: NOTIFICATION_CHANGE_SUCCESS,
            payload: data,
        })
}

export function postThink(info, cb) {
    return dispatch => api(`profile/post`, 'post', info).then(
        res => {
            dispatch({
                type: THINK_POST_SUCCESS,
                payload: res,
            });

            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function getHeader(id) {
    return dispatch => api(`profile/header/${id}`, 'get').then(
        res => {
            dispatch({
                type: HEADER_GET_SUCCESS,
                payload: res,
            });
        }).catch(error => {
            console.log(error);
        })
}

// export function getFollowers(id) {
//     return dispatch => api(`profile/follower/${id}`, 'get').then(
//         res => {
//             dispatch({
//                 type: HEADER_GET_SUCCESS,
//                 payload: res,
//             });
//         }).catch(error => {
//             console.log(error);
//         })
// }

export function postFollower(id, cb) {
    return dispatch => api(`profile/follow/${id}`, 'post').then(
        res => {
            dispatch({
                type: POST_FOLLOWER_SUCCESS,
                payload: res,
            });
            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function getFollowers(id, count, search, cb) {
    return dispatch => api(`profile/followers/${id}?page=${count}&search=${search}`, 'get').then(
        res => {
            dispatch({
                type: GET_FOLLOWERS_LIST_SUCCESS,
                payload: res,
            });
            cb(res);
        }).catch(error => {
            console.log(error);
        })
}

export function unFriend(id, cb) {
    return dispatch => api(`profile/follow/${id}`, 'delete').then(
        res => {
            dispatch({
                type: UN_FRIEND_SUCCESS,
                payload: res,
            });
            cb(res);
        }).catch(error => {
            console.log(error);
        })
}








