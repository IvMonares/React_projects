import styled from "@emotion/styled";

export const DropzoneContainer = styled.div`
    box-shadow: 3px 3px 8px rgba(31, 41, 55, 1);
    border-radius: 0.5rem;
    background-color: white;

    max-width: 800px;
    width: 95%;
    margin: 2rem auto 0 auto;
    padding: 2rem;

    @media (min-width: 992px) {
        display: flex;
        flex-direction: row-reverse;
    }

    div:not(.spinner) {
        flex: 1;
        margin: 0;
    }

    div.contained {
        display: flex;
        flex-direction: column;

        @media (min-width: 768px) {
            margin: 0 1rem 0 0;
        }
    }

    h2 {
        font-size: 2rem;
        line-height: 3rem;
        font-weight: bold;
        color: rgba(31, 41, 55, 1);
    }

    p {
        font-size: 1.15rem;
        text-align: justify;
    }

    span {
        font-weight: bold;
        color: rgba(239, 68, 68, 1);
    }
`;

export const DropzoneBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: dashed 3px #c3c3c3;
    border-radius: 1rem;
    background-color: #f9f9f9;
    min-height: 10rem;

    div:not(.spinner) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 1rem;
    }

    div.dropzone {
        width: 100%;
        padding: 8rem 0;
    }

    input {
        height: 100%;
    }

    p {
        text-align: center;
        font-size: 1.5rem;
        color: grey;
        line-height: 1.25;
        margin: 0;
    }

    a {
        width: 100%;
        font-size: 1rem;
        text-transform: none;
        margin: 0;
    }
`;

export const FileList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h4 {
        margin: 0;
        line-height: 1;
    }

    li {
        background-color: white;
        flex: 1;
        padding: 0.75rem 1.25rem;
        margin: 1.5rem;
        box-shadow: 3px 3px 8px rgba(31, 41, 55, 1);
        border-radius: 0.5rem;
        text-align: left;
    }

    li p {
        color: black;
        font-weight: bold;
        font-size: 1.2rem;
        text-align: left;
    }

    li span {
        color: grey;
        font-size: 0.8rem;
    }
`;
