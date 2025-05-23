import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    //Add acount
    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        );

        return await newUser.user.updateProfile({
            displayName: name,
        });
    }

    //Login acount
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    //Logout acount
    async logout() {
        return this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;
