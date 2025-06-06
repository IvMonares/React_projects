import React, { useState, useEffect } from "react";
import firebase from "../firebase";

function useAuthentication() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return authUser;
}

export default useAuthentication;
