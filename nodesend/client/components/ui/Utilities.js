import styled from "@emotion/styled";

export const Button = styled.a`
    display: inline-block;
    padding: 1rem 1.5rem;
    margin: 0.25rem 0.5rem;
    text-align: center;
    font-size: 1.2rem;
    text-transform: uppercase;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;

    background-color: ${(props) =>
        props.bg_color ? props.bg_color : "rgba(239, 68, 68, 1)"};
    color: ${(props) => (props.color ? props.color : "white")};
`;

export const Container = styled.div`
    width: 100%;
    margin: 2rem auto 0 auto;

    @media (min-width: 576px) {
        max-width: 540px;
    }

    @media (min-width: 768px) {
        max-width: 720px;
    }

    @media (min-width: 992px) {
        max-width: 960px;
    }

    @media (min-width: 1200px) {
        max-width: 1140px;
    }
`;

export const Card = styled.div`
    box-shadow: 3px 3px 8px rgba(31, 41, 55, 1);
    border-radius: 0.5rem;
    background-color: white;

    max-width: 800px;
    width: 95%;
    margin: 2rem auto 0 auto;
    padding: 2rem;
    text-align: center;

    span {
        font-size: 1.75rem;
        text-transform: uppercase;
        font-weight: bold;
        color: rgba(239, 68, 68, 1);
    }
`;

export const Title = styled.h2`
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-family: sans-serif;
    font-weight: 400;
    color: rgba(31, 41, 55, 1);
    text-align: center;
`;

export const Alert = styled.p`
    width: 100%;
    margin: 0.5rem 0;
    padding: 1.5rem 1rem;
    font-size: 1.1rem;

    background-color: ${(props) =>
        props.success
            ? "#c8f7cb"
            : props.error
            ? "#ffd9d9"
            : props.info
            ? "#d2ecf7"
            : "#f9f9f9"};
    color: ${(props) =>
        props.success
            ? "#00b324"
            : props.error
            ? "#bd0808"
            : props.info
            ? "#176ce3"
            : "rgba(31, 41, 55, 1)"};
    border-left: ${(props) =>
        props.success
            ? "solid 8px #00b324"
            : props.error
            ? "solid 8px #bd0808"
            : props.info
            ? "solid 8px #176ce3"
            : "solid 8px rgba(31, 41, 55, 1)"};
`;
