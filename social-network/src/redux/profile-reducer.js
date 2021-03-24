import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const SAFE_PHOTO_SUCCESS = 'social-network/profile/SAFE_PHOTO_SUCCESS';
const SAFE_PROFILE_SUCCESS = 'social-network/profile/SAFE_PROFILE_SUCCESS';
const SET_MY_PHOTO = 'social-network/profile/SET_MY_PHOTO';

let initialState = {
    posts: [{id: "1", message: "This is my first post.", likesCount: "5"},
        {id: "2", message: "Hello, world!", likesCount: "15"},
        {id: "3", message: "It`s third post for check.", likesCount: "26"},
        {id: "4", message: "Posts are work!", likesCount: "266"}],
    profile: null,
    status: "status",
    myPhoto: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: `${state.posts.length + 1}`,
                message: action.postBody,
                likesCount: '0'
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }

        case SET_MY_PHOTO: {
            if (state.profile.userId === 14816) {
                return {
                    ...state,
                    myPhoto: action.photo
                };
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }

        case SAFE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        }

        case SAFE_PROFILE_SUCCESS: {
            return {
                ...state,
                profile: action.profile
            };
        }

        default:
            return state;
    }
}

//ActionCreators
export const addPostActionCreator = (postBody) => ({type: ADD_POST, postBody});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const savePhotoSuccess = (photos) => ({type: SAFE_PHOTO_SUCCESS, photos});
export const setMyPhoto = (photo) => ({type: SET_MY_PHOTO, photo});

//ThunkCreators
export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
    dispatch(setMyPhoto(response.data.photos.large));
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]})); //надо парсить facebook, чтобы для каждого типа сайта отдельно вылетала ошибка
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;