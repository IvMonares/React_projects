import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import {
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    CREATE_LINK_SUCCESS,
    SHOW_ALERT,
    CLEAR_ALERT,
    CLEAR_STATE,
    EDIT_PASSWORD,
    EDIT_DOWNLOADS,
    EDIT_AUTHOR,
    EDIT_HAS_PASSWORD,
} from "../../types";
import axiosClient from "../../config/axios";

const AppState = ({ children }) => {
    // Define initial state
    const initialState = {
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

    // Define reducer
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Display alerts
    const showAlert = (msg, success, error, info) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                success,
                error,
                info,
                message: msg,
            },
        });

        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            });
        }, 3000);
    };

    //Upload files
    const uploadFile = async (formData, org_filename) => {
        dispatch({
            type: FILE_UPLOAD,
            payload: true,
        });

        try {
            const result = await axiosClient.post("/api/files", formData);

            dispatch({
                type: FILE_UPLOAD_SUCCESS,
                payload: {
                    filename: result.data.file,
                    org_filename: org_filename,
                },
            });
        } catch (error) {
            showAlert(error.response.data.msg, false, true, false);
        }

        dispatch({
            type: FILE_UPLOAD,
            payload: false,
        });
    };

    // Create Link
    const createLink = async () => {
        if (
            state.hasPassword &&
            (state.password == null || state.password == "")
        ) {
            showAlert("Por favor ingrese la contraseña.", false, true, false);
            return;
        }

        const data = {
            filename: state.filename,
            org_filename: state.org_filename,
            downloads: state.downloads,
            password: state.password,
            author: state.author,
        };

        try {
            const result = await axiosClient.post("/api/links", data);

            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: result.data.msg,
            });
        } catch (error) {
            showAlert(error.response.data.msg, false, true, false);
        }
    };

    const clearState = () => {
        dispatch({
            type: CLEAR_STATE,
        });
    };

    const editHasPassword = (hasPassword) => {
        dispatch({
            type: EDIT_HAS_PASSWORD,
            payload: hasPassword,
        });
    };

    const editPassword = (password) => {
        dispatch({
            type: EDIT_PASSWORD,
            payload: password,
        });
    };

    const editDownloads = (downloads) => {
        dispatch({
            type: EDIT_DOWNLOADS,
            payload: parseInt(downloads),
        });
    };

    const editAuthor = (userId) => {
        dispatch({
            type: EDIT_AUTHOR,
            payload: userId,
        });
    };

    return (
        <appContext.Provider
            value={{
                file_message: state.file_message,
                filename: state.filename,
                org_filename: state.org_filename,
                loading: state.loading,
                downloads: state.downloads,
                hasPassword: state.hasPassword,
                password: state.password,
                url: state.url,
                createLink,
                showAlert,
                uploadFile,
                clearState,
                editHasPassword,
                editPassword,
                editDownloads,
                editAuthor,
            }}
        >
            {children}
        </appContext.Provider>
    );
};

export default AppState;
