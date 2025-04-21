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
import validateLoginAccount from "../validations/validateLoginAccount";

//Constants
const INITIAL_STATE = { email: "", password: "" };

export default function Login() {
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useValidation(INITIAL_STATE, validateLoginAccount, loginAccount);

    async function loginAccount() {
        try {
            await firebase.login(values.email, values.password);
            Router.push("/");
        } catch (error) {
            console.error("Hubo un error creando el usuario", error.message);
            setErrorMessage(error.message);
        }
    }

    return (
        <Layout>
            <h1 className="center-text mt-5">Iniciar Sesión</h1>

            <Form onSubmit={handleSubmit} noValidate>
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

                <InputSumbit type="submit" value="Iniciar Sesión" />
                {errorMessage && <ErrorLarge>{errorMessage}</ErrorLarge>}
            </Form>
        </Layout>
    );
}
