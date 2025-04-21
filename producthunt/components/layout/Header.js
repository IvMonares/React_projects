import React, { useContext } from "react";
import Search from "../ui/Search";
import Navigation from "./Navigation";
import Link from "next/link";
import Router from "next/router";

import styles from "../../styles/Header.module.css";
import { FirebaseContext } from "../../firebase";

const Header = () => {
    const { firebase, user } = useContext(FirebaseContext);

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.centerFlex}>
                    <Link href="/">
                        <p className={styles.logo}>P</p>
                    </Link>

                    <Search></Search>
                    <Navigation></Navigation>
                </div>
                <div className={styles.sessionContainer}>
                    {user ? (
                        <>
                            <p className={styles.userGreeting}>
                                <b>Hola:</b> {user.displayName}
                            </p>
                            <a
                                className="btn bg-orange"
                                onClick={() => {
                                    firebase.logout();
                                    Router.push("/");
                                }}
                            >
                                Cerrar Sesión
                            </a>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="btn bg-orange">Login</a>
                            </Link>
                            <Link href="/create-account">
                                <a className="btn">Crear Cuenta</a>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
