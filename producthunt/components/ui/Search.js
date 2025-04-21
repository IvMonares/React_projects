import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Router from "next/router";

const InputText = styled.input`
    border: 1px solid var(--light-grey);
    padding: 1rem;
    max-width: 30rem;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url(/img/search.png);
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    cursor: pointer;
    text-indent: -9999px;
`;

const Search = () => {
    const [query, setQuery] = useState("");

    const searchProduct = (e) => {
        e.preventDefault();

        if (query.trim() == "") return;

        Router.push({
            pathname: "/search",
            query: {
                q: query,
            },
        });
    };

    return (
        <form
            css={css`
                position: relative;
            `}
            onSubmit={searchProduct}
        >
            <InputText
                type="text"
                placeholder="Buscar productos..."
                onChange={(e) => setQuery(e.target.value)}
            ></InputText>
            <InputSubmit type="submit">Buscar</InputSubmit>
        </form>
    );
};

export default Search;
