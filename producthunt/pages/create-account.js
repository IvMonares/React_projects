import { useState } from "react";
import Layout from "../components/layout/Layout";
import {
    Form,
    Field,
    InputSumbit,
    Error,
    ErrorLarge,
} from "../components/ui/Form";
import Router from "next/router";
import firebase from "../firebase";

//validations
import useValidation from "../hooks/useValidation";
import validateCreateAccount from "../validations/validateCreateAccount";

//Constants
const INITIAL_STATE = { name: "", email: "", password: "" };

export default function CreateAccount() {
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useValidation(INITIAL_STATE, validateCreateAccount, addAccount);

    async function addAccount() {
        try {
            await firebase.register(values.name, values.email, values.password);
            Router.push("/");
        } catch (error) {
            console.error("Hubo un error creando el usuario", error.message);
            setErrorMessage(error.message);
        }
    }

    return (
        <Layout>
            <h1 className="center-text mt-5">Crear Cuenta</h1>

            <Form onSubmit={handleSubmit} noValidate>
                <Field>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Field>
                {errors.name && <Error>{errors.name}</Error>}

                <Field>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Tu email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Field>
                {errors.email && <Error>{errors.email}</Error>}

                <Field>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Tu contraseña"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Field>
                {errors.password && <Error>{errors.password}</Error>}

                <InputSumbit type="submit" value="Crear Cuenta" />
                {errorMessage && <ErrorLarge>{errorMessage}</ErrorLarge>}
            </Form>
        </Layout>
    );
}
