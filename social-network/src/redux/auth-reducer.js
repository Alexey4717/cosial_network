import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'social-network/auth/TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            };
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            };
        }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        const {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCapthaUrl())
                } else {
                    const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Common error';
                    dispatch(stopSubmit("login", {_error: message}));
                }
            }
    };

export const getCapthaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch) => {
        const response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
    };

export default authReducer;