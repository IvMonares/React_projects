import React from "react";
import { css } from "@emotion/react";

const AccessDenied = () => {
    return (
        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
            `}
        >
            Lo sentimos. No tiene permiso de acceder a esta página.
        </h1>
    );
};

export default AccessDenied;
