import {
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    CREATE_LINK_SUCCESS,
    SHOW_ALERT,
    CLEAR_ALERT,
    CLEAR_STATE,
    EDIT_HAS_PASSWORD,
    EDIT_PASSWORD,
    EDIT_DOWNLOADS,
    EDIT_AUTHOR,
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                file_message: action.payload,
            };
        case CLEAR_ALERT:
            return {
                ...state,
                file_message: null,
            };
        case FILE_UPLOAD:
            return {
                ...state,
                loading: action.payload,
            };
        case FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                filename: action.payload.filename,
                org_filename: action.payload.org_filename,
            };
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: action.payload,
            };

        case CLEAR_STATE:
            return {
                ...state,
                filename: "",
                org_filename: "",
                file_message: null,
                loading: false,
                downloads: 1,
                hasPassword: false,
                password: "",
                author: null,
                url: null,
            };
        case EDIT_HAS_PASSWORD:
            return {
                ...state,
                hasPassword: action.payload,
            };
        case EDIT_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        case EDIT_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload,
            };
        case EDIT_AUTHOR:
            return {
                ...state,
                author: action.payload,
            };
        default:
            return state;
    }
};
