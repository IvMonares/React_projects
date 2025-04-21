import React, { useContext, useEffect } from "react";
import { Field } from "./ui/Form";
import { css } from "@emotion/react";

import appContext from "../context/app/appContext";

const LinkForm = ({ userId }) => {
    // Access app context
    const AppContext = useContext(appContext);
    const {
        hasPassword,
        editHasPassword,
        editPassword,
        editDownloads,
        editAuthor,
    } = AppContext;

    useEffect(() => {
        if (userId) {
            editAuthor(userId);
        }
    }, []);

    return (
        <div
            css={css`
                padding: 0 !important;
                width: 100% !important;
                margin: 2rem 0 1rem 0 !important;
            `}
        >
            <Field
                css={css`
                    padding: 0 !important;
                    width: 100% !important;
                `}
            >
                <label htmlFor="downloads">Eliminar despues de:</label>
                <select
                    id="downloads"
                    name="downloads"
                    onChange={(e) => editDownloads(e.target.value)}
                >
                    <option value="1">1 descarga</option>
                    <option value="5">5 descargas</option>
                    <option value="10">10 descargas</option>
                    <option value="25">25 descargas</option>
                    <option value="50">50 descargas</option>
                    <option value="100">100 descargas</option>
                </select>
            </Field>
            <Field
                css={css`
                    padding: 0 !important;
                    width: 100% !important;
                    margin-top: 1rem !important;
                `}
            >
                <label htmlFor="password">Proteger con Contraseña</label>

                <div
                    css={css`
                        padding: 0 !important;
                        display: flex !important;
                        flex-direction: row !important;
                    `}
                >
                    <input
                        css={css`
                            width: 2rem !important;
                        `}
                        id="password_check"
                        name="password_check"
                        type="checkbox"
                        onChange={(e) => {
                            editHasPassword(e.target.checked);
                        }}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña del archivo"
                        disabled={!hasPassword}
                        onChange={(e) => editPassword(e.target.value)}
                    ></input>
                </div>
            </Field>
        </div>
    );
};

export default LinkForm;
