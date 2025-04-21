import styled from "@emotion/styled";

export const Form = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

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
    margin-top: 2rem;
    display: flex;
    align-items: center;

    &::first-of-type {
        margin-top: 0;
    }

    label {
        flex: 0 0 15rem;
        font-size: 1.8rem;
        text-align: right;
        padding-right: 2rem;
    }

    input,
    textarea {
        flex: 1;
        padding: 1rem;
    }

    textarea {
        height: 40rem;
    }
`;

export const InputSumbit = styled.input`
    background-color: var(--orange);
    width: 100%;
    padding: 1.5rem;
    margin-top: 2rem;
    text-align: center;
    color: white;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
    cursor: pointer;
`;

export const Error = styled.p`
    color: red;
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    text-transform: uppercase;
    margin: 0 0 1rem 15rem;
`;

export const ErrorLarge = styled.p`
    color: white;
    background-color: red;
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: uppercase;
    margin: 1rem 0 0 0;
    padding: 1rem;
    text-align: center;
`;
