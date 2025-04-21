import styled from "@emotion/styled";

export const Form = styled.form`
    box-shadow: 3px 3px 8px rgba(31, 41, 55, 1);
    border-radius: 0.5rem;
    padding: 1rem 2rem 2rem 2rem;
    background-color: white;

    max-width: 600px;
    width: 95%;
    margin: 2rem auto 0 auto;

    fieldset {
        margin: 2rem 0;
        border: 1px solid var(--grey);
        font-size: 2rem;
        padding: 2rem;
    }

    legend {
        padding: 0 1rem;
    }
`;

export const Field = styled.div`
    margin-top: 0.75rem;
    align-items: center;

    &:first-of-type {
        margin-top: 0;
    }

    label {
        font-size: 1.4rem;
        display: inline-block;
        margin-bottom: 0.5rem;
    }

    input,
    select,
    textarea {
        display: block;
        width: 100%;
        height: calc(2.25rem + 2px);
        padding: 0.5rem 0.75rem;
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #ffffff;
        background-clip: padding-box;
        border: 2px solid #ced4da;
        border-radius: 0.25rem;
        box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        &:focus {
            color: #495057;
            background-color: #ffffff;
            border-color: #80bdff;
            outline: 0;
            box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), none;
        }

        &:-ms-input-placeholder,
        &::-webkit-input-placeholder,
        &::placeholder,
        &:-moz-placeholder {
            color: #939ba2;
            opacity: 1;
        }

        &:disabled {
            cursor: not-allowed;
        }
    }

    input[type="checkbox"] {
        margin: 0.25rem;
        height: 1.5rem;
    }

    select {
        height: 2.25rem;
        line-height: 1;
        padding: 0 1rem;
    }

    textarea {
        height: 40rem;
    }
`;

export const InputSumbit = styled.input`
    width: 100%;
    padding: 0.75rem 1.5rem;
    margin-top: 1.5rem;
    text-align: center;
    background-color: ${(props) =>
        props.bg_color ? props.bg_color : "rgba(239, 68, 68, 1)"};
    color: ${(props) => (props.color ? props.color : "white")};
    font-size: 1.5rem;
    text-transform: uppercase;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: ${(props) =>
            props.hover_bg_color
                ? props.hover_bg_color
                : "rgba(31, 41, 55, 1)"};
        color: ${(props) => (props.hover_color ? props.hover_color : "white")};
    }
`;

export const Error = styled.p`
    margin: 0 0 0 1rem;
    color: red;
    font-size: 0.95rem;
    font-weight: bold;
    text-transform: uppercase;
`;
