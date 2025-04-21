import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Form, Field, InputSumbit, Error } from "../components/ui/Form";
import { Title, Alert } from "../components/ui/Utilities";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
import { useRouter } from "next/router";

const CreateAccount = () => {
    // Access authentication context
    const AuthContext = useContext(authContext);
    const { user, message, registerUser } = AuthContext;

    // Next router
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    // Form validation
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("El Nombre es Obligatorio"),
            email: Yup.string()
                .email("El Email no es Válido")
                .required("El Email es Obligatorio"),
            password: Yup.string()
                .required("La Contraseña es Obligatoria")
                .min(6, "La Contraseña Debe Ser de al Menos 6 Caractéres"),
        }),
        onSubmit: (values) => {
            registerUser(values);
        },
    });

    return (
        <Layout>
            <Title>Crear Cuenta</Title>
            <div>
                <Form onSubmit={formik.handleSubmit}>
                    <Field>
                        <label htmlFor="username">Nombre</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Nombre de usuario"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></input>
                        {formik.touched.username && formik.errors.username ? (
                            <Error>
                                <span>{formik.errors.username}</span>
                            </Error>
                        ) : null}
                    </Field>
                    <Field>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de usuario"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></input>
                        {formik.touched.email && formik.errors.email ? (
                            <Error>
                                <span>{formik.errors.email}</span>
                            </Error>
                        ) : null}
                    </Field>
                    <Field>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password de usuario"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></input>
                        {formik.touched.password && formik.errors.password ? (
                            <Error>
                                <span>{formik.errors.password}</span>
                            </Error>
                        ) : null}
                    </Field>

                    <InputSumbit type="submit" value="Crear Cuenta" />
                    {message && (
                        <Alert
                            success={message.success}
                            error={message.error}
                            info={message.info}
                        >
                            {message.message}
                        </Alert>
                    )}
                </Form>
            </div>
        </Layout>
    );
};

export default CreateAccount;
