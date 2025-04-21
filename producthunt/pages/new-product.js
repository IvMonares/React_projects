import React, { useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import {
    Form,
    Field,
    InputSumbit,
    Error,
    //ErrorLarge,
} from "../components/ui/Form";
import Router, { useRouter } from "next/router";
import { FirebaseContext } from "../firebase";
import { v4 as uuidv4 } from "uuid";

//Validations
import useValidation from "../hooks/useValidation";
import validateCreateProduct from "../validations/validateCreateProduct";
import AccessDenied from "../components/layout/AccessDenied";

//Constants
const INITIAL_STATE = {
    name: "",
    company: "",
    image: "",
    url: "",
    description: "",
};

export default function NewProduct() {
    //state for image uploading
    const [imageURL, setImageURL] = useState("");
    //const [errorMessage, setErrorMessage] = useState(false);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useValidation(INITIAL_STATE, validateCreateProduct, addProduct);

    //Hook de routing
    const router = useRouter();

    //context con las operaciones de Firebase
    const { firebase, user } = useContext(FirebaseContext);

    async function addProduct() {
        if (!user) {
            router.push("/login");
        }

        //Create object for product
        const product = {
            name: values.name,
            company: values.company,
            image: imageURL,
            url: values.url,
            description: values.description,
            votes: 0,
            comments: [],
            creationDate: Date.now(),
            creator: {
                id: user.uid,
                name: user.displayName,
            },
            hasVoted: [],
        };

        firebase.db.collection("products").add(product);
        router.push("/");
    }

    const uploadImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setImageURL("");
            return;
        } else {
            var filename = uuidv4();

            firebase.storage
                .ref("products")
                .child(filename)
                .put(e.target.files[0])
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((result) => {
                        setImageURL(result);
                    });
                });
        }
    };

    return (
        <Layout>
            {!user ? (
                <AccessDenied></AccessDenied>
            ) : (
                <>
                    <h1 className="center-text mt-5">Nuevo Producto</h1>

                    <Form onSubmit={handleSubmit} noValidate>
                        <fieldset>
                            <legend>Información General</legend>
                            <Field>
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Nombre del producto"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.name && <Error>{errors.name}</Error>}

                            <Field>
                                <label htmlFor="company">Empresa</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Nombre de la empresa"
                                    value={values.company}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.company && <Error>{errors.company}</Error>}

                            <Field>
                                <label htmlFor="image">Imágen</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={uploadImage}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.image && <Error>{errors.image}</Error>}

                            <Field>
                                <label htmlFor="url">URL</label>
                                <input
                                    type="text"
                                    id="url"
                                    name="url"
                                    placeholder="URL del producto"
                                    value={values.url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.url && <Error>{errors.url}</Error>}
                        </fieldset>
                        <fieldset>
                            <legend>Sobre tu producto</legend>

                            <Field>
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Descripción"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.description && (
                                <Error>{errors.description}</Error>
                            )}
                        </fieldset>

                        <InputSumbit type="submit" value="Crear Producto" />
                        {
                            //errorMessage && <ErrorLarge>{errorMessage}</ErrorLarge>
                        }
                    </Form>
                </>
            )}
        </Layout>
    );
}
