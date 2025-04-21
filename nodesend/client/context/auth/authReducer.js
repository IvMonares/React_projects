import {
    AUTHENTICATED_USER_SUCCESS,
    AUTHENTICATED_USER_ERROR,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    CLEAR_ALERT,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case AUTHENTICATED_USER_SUCCESS:
            return { ...state, user: action.payload };
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                message: {
                    success: true,
                    error: false,
                    info: false,
                    message: action.payload,
                },
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("rns_token", action.payload);

            return {
                ...state,
                token: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem("rns_token");

            return {
                token: "",
                user: null,
                message: null,
            };
        case REGISTRATION_ERROR:
        case LOGIN_ERROR:
        case AUTHENTICATED_USER_ERROR:
            return {
                ...state,
                message: {
                    success: false,
                    error: true,
                    info: false,
                    message: action.payload,
                },
            };
        case CLEAR_ALERT:
            return {
                ...state,
                message: null,
            };
        default:
            return state;
    }
};
