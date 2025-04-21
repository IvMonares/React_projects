import React from "react";
import Head from "next/head";
import Header from "./Header";
import { css } from "@emotion/react";
import { Container } from "./ui/Utilities";

const Layout = ({ children }) => (
    <>
        <Head>
            <title>React NodeSend</title>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
                integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
                crossorigin="anonymous"
            />
        </Head>
        <div
            css={css`
                background-color: rgba(243, 244, 246, 1);
                min-height: 100vh;
            `}
        >
            <Header />
            <Container>
                <main>{children}</main>
            </Container>
        </div>
    </>
);

export default Layout;
