import React from "react";

//Styling
import { css } from "@emotion/react";
import styled from "@emotion/styled";

//Timing
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const CommentContainer = styled.li`
    border: 1px solid var(--grey);
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin: 1rem 0;
`;

const ProductCreator = styled.span`
    padding: 0.5rem 2rem;
    background-color: var(--orange);
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    border-radius: 0.5rem;
`;

const Comment = ({ comment, fromCreator }) => {
    return (
        <CommentContainer>
            <p>{comment.message}</p>
            <p
                css={css`
                    text-align: right;
                    margin: 0;
                `}
            >
                Escrito por: <b>{comment.username}</b> hace{" "}
                <i>
                    {formatDistanceToNow(new Date(comment.commentDate), {
                        locale: es,
                    })}
                </i>
            </p>
            <p
                css={css`
                    text-align: right;
                    margin: 0 0 1rem 0;
                `}
            >
                {fromCreator && <ProductCreator>Es Creador</ProductCreator>}
            </p>
        </CommentContainer>
    );
};

export default Comment;
