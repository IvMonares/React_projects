import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";

//Components
import Layout from "../../components/layout/Layout";
import Product404 from "../../components/layout/Product404";
import Spinner from "../../components/layout/Spinner";
import { Field, InputSumbit, Error } from "../../components/ui/Form";
import Comment from "../../components/layout/Comment";

//Timing
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

//Styling
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const Product = () => {
    //Component state
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({ message: "" });
    const [commentError, setCommentError] = useState(null);
    const [loading, setLoading] = useState(true);

    //Routing to get product id
    const router = useRouter();
    const id = router.query.id;

    //Firebase Context
    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        let mounted = true;
        if (id && mounted) {
            //Query DB
            const getProduct = async () => {
                const productQuery = await firebase.db
                    .collection("products")
                    .doc(id)
                    .onSnapshot(function (doc) {
                        if (doc.exists) {
                            setProduct(doc.data());
                            setError(false);
                        } else {
                            setError(true);
                            setProduct({});
                        }
                        setLoading(false);
                    });
            };
            getProduct();
        }
        return () => (mounted = false);
    }, [id]);

    const voteProduct = async () => {
        if (!user) {
            router.push("/login");
        }

        //Verify user hasn't voted before
        if (product.hasVoted.includes(user.uid)) return;

        //Calculate new total
        const newTotal = product.votes + 1;

        //Get product reference
        const productQuery = await firebase.db.collection("products").doc(id);

        //Update DB
        productQuery.update({
            votes: newTotal,
            hasVoted: [...product.hasVoted, user.uid],
        });
    };

    //Function to create comments
    const commentChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });
    };

    const addComment = async (e) => {
        e.preventDefault();
        if (!user) {
            router.push("/login");
        }

        //verify message is not blank
        if (!/\S/.test(comment.message)) {
            setCommentError(true);
            return;
        }
        setCommentError(false);

        //Build full comment object
        let newComment = {
            ...comment,
            userId: user.uid,
            username: user.displayName,
            commentDate: Date.now(),
        };

        //Get product reference
        const productQuery = await firebase.db.collection("products").doc(id);

        //Update DB
        productQuery.update({
            comments: [...product.comments, newComment],
        });

        //Reset message input field
        setComment({ message: "" });
    };

    //Function to check if user is product creator
    const isCreator = () => {
        if (!user) return false;
        return product.creator.id === user.uid;
    };

    //Deletes product from DB
    const deleteProduct = async () => {
        if (!user) {
            router.push("/login");
        }

        if (!isCreator()) {
            router.push("/");
        }

        try {
            await firebase.db.collection("products").doc(id).delete();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            {loading ? (
                <div
                    css={css`
                        padding: 2rem calc((100vw - 80px) / 2);
                        margin-top: 5rem;
                        width: 100%;
                    `}
                >
                    <Spinner></Spinner>
                </div>
            ) : (
                <>
                    {error ? (
                        <Product404></Product404>
                    ) : (
                        <div className="container">
                            <h1
                                css={css`
                                    margin-top: 5rem;
                                    text-align: center;
                                `}
                            >
                                {product.name}
                            </h1>
                            <div>
                                <p
                                    css={css`
                                        margin: 0;
                                    `}
                                >
                                    Por: <b>{product.creator.name}</b> de{" "}
                                    <b>{product.company}</b>
                                </p>
                                <p
                                    css={css`
                                        margin: 0 0 1rem 0;
                                    `}
                                >
                                    Publicado hace:{" "}
                                    <b>
                                        {formatDistanceToNow(
                                            new Date(product.creationDate),
                                            {
                                                locale: es,
                                            }
                                        )}
                                    </b>
                                </p>
                                <ProductContainer>
                                    <div>
                                        <img src={product.image} />
                                        <p>{product.description}</p>
                                        {user && (
                                            <>
                                                <h2>Agrega tu comentario</h2>
                                                <form onSubmit={addComment}>
                                                    <Field>
                                                        <input
                                                            type="text"
                                                            name="message"
                                                            onChange={
                                                                commentChange
                                                            }
                                                            value={
                                                                comment.message
                                                            }
                                                        />
                                                    </Field>
                                                    {commentError && (
                                                        <Error>
                                                            No puede publicar un
                                                            mensaje en blanco
                                                        </Error>
                                                    )}
                                                    <InputSumbit
                                                        type="submit"
                                                        value="Agregar comentario"
                                                    ></InputSumbit>
                                                </form>
                                            </>
                                        )}

                                        <h2
                                            css={css`
                                                margin: 2rem 0;
                                            `}
                                        >
                                            Comentarios
                                        </h2>
                                        {product.comments.length === 0 ? (
                                            <p>Aún no hay comentarios</p>
                                        ) : (
                                            <ul>
                                                {product.comments.map(
                                                    (comment, index) => {
                                                        return (
                                                            <Comment
                                                                key={`${comment.userId}-${index}`}
                                                                comment={
                                                                    comment
                                                                }
                                                                fromCreator={
                                                                    comment.userId ==
                                                                    product
                                                                        .creator
                                                                        .id
                                                                }
                                                            ></Comment>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                    <aside>
                                        <a
                                            className="btn bg-orange"
                                            href={product.url}
                                            target="_blank"
                                            css={css`
                                                margin-top: 0;
                                            `}
                                        >
                                            Visitar URL
                                        </a>

                                        <div
                                            css={css`
                                                margin-top: 5rem;
                                            `}
                                        >
                                            <p
                                                css={css`
                                                    text-align: center;
                                                    font-size: 2rem;
                                                `}
                                            >
                                                {product.votes} Votos
                                            </p>
                                            {user && (
                                                <>
                                                    <a
                                                        className={
                                                            product.hasVoted.includes(
                                                                user.uid
                                                            )
                                                                ? "btn bg-light-grey"
                                                                : "btn bg-orange"
                                                        }
                                                        onClick={voteProduct}
                                                    >
                                                        Votar
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </aside>
                                </ProductContainer>
                            </div>

                            {isCreator() && (
                                <button
                                    className="btn bg-orange"
                                    css={css`
                                        position: fixed;
                                        bottom: 1rem;
                                        right: 1rem;
                                    `}
                                    onClick={deleteProduct}
                                >
                                    Eliminar Producto
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
};

export default Product;
