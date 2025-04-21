import React, { useEffect, useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Button } from "./ui/Utilities";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

const HeaderContainer = styled.header`
    padding: 1rem 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #d3d4d6;

    @media (min-width: 992px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

const Logo = styled.img`
    width: 320px;
    margin-bottom: 2rem;
    cursor: pointer;

    @media (min-width: 992px) {
        margin-bottom: 0;
    }
`;

const Header = () => {
    // Access authentication context
    const AuthContext = useContext(authContext);
    const { user, authenticatedUser, logoutUser } = AuthContext;

    // Access app context
    const AppContext = useContext(appContext);
    const { clearState } = AppContext;

    // Router
    const router = useRouter();

    useEffect(() => {
        authenticatedUser();
    }, []);

    const redirectHome = () => {
        clearState();
        router.push("/");
    };

    return (
        <HeaderContainer>
            <Logo src="/logo.svg" onClick={redirectHome} />
            <div>
                {user ? (
                    <div
                        css={css`
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                        `}
                    >
                        <p
                            css={css`
                                margin: 0 1rem 0 0;
                            `}
                        >
                            <b>Hola: </b>
                            {user.username}
                        </p>
                        <Button
                            bg_color="rgba(31, 41, 55, 1)"
                            onClick={() => {
                                logoutUser();
                                redirectHome();
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <Button>Iniciar Sesión</Button>
                        </Link>
                        <Link href="/create-account">
                            <Button bg_color="rgba(31, 41, 55, 1)">
                                Crear Cuenta
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </HeaderContainer>
    );
};

export default Header;
