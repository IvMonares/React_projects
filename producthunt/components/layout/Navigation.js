import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";

const NavContainer = styled.nav`
    padding-left: 2rem;

    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--grey);
        font-family: "PT Sans", sans-serif;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;

const Navigation = () => {
    const { user } = useContext(FirebaseContext);

    return (
        <NavContainer>
            <Link href="/">Inicio</Link>
            <Link href="/popular">Populares</Link>
            {user && <Link href="/new-product">Nuevo Producto</Link>}
        </NavContainer>
    );
};

export default Navigation;
