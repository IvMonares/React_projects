import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
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
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/token";

const AuthState = ({ children }) => {
    // Define initial state
    const initialState = {
        token:
            typeof window !== "undefined"
                ? localStorage.getItem("rns_token")
                : "",
        user: null,
        message: null,
    };

    // Define reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Register new user
    const registerUser = async (values) => {
        try {
            const response = await axiosClient.post("/api/users", values);

            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: response.data.msg,
            });

            loginUser(values);
        } catch (error) {
            dispatch({
                type: REGISTRATION_ERROR,
                payload: error.response.data.msg,
            });
        }

        //Clear Alert
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            });
        }, 3000);
    };

    //Login user
    const loginUser = async (values) => {
        try {
            const response = await axiosClient.post("/api/auth", values);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.token,
            });

            authenticatedUser();
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg,
            });
        }

        //Clear Alert
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            });
        }, 3000);
    };

    // Get authenticated user based on JWT
    const authenticatedUser = async () => {
        // Get token
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("rns_token")
                : null;

        tokenAuth(token);

        if (token) {
            try {
                const response = await axiosClient.get("/api/auth");

                dispatch({
                    type: AUTHENTICATED_USER_SUCCESS,
                    payload: response.data.user,
                });
            } catch (error) {
                dispatch({
                    type: AUTHENTICATED_USER_ERROR,
                    payload: error.response.data.msg,
                });
            }
        }
    };

    //Logout user
    const logoutUser = () => {
        dispatch({
            type: LOGOUT,
        });
    };

    return (
        <authContext.Provider
            value={{
                token: state.token,
                user: state.user,
                message: state.message,
                registerUser,
                loginUser,
                authenticatedUser,
                logoutUser,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthState;
