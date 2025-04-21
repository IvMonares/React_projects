import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Form, Field, InputSumbit, Error } from "../components/ui/Form";
import { Title, Alert } from "../components/ui/Utilities";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
import { useRouter } from "next/router";

const Login = () => {
    // Access authentication context
    const AuthContext = useContext(authContext);
    const { user, message, loginUser } = AuthContext;

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
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("El Email no es Válido")
                .required("El Email es Obligatorio"),
            password: Yup.string().required("La Contraseña es Obligatoria"),
        }),
        onSubmit: (values) => {
            loginUser(values);
        },
    });

    return (
        <Layout>
            <Title>Iniciar Sesión</Title>
            <div>
                <Form onSubmit={formik.handleSubmit}>
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
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Contraseña de usuario"
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
                    <InputSumbit type="submit" value="Iniciar Sesión" />
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

export default Login;
