import React, { useState, useContext } from "react";
import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";
import router from "next/router";
import { Title, Button, Card, Alert } from "../../components/ui/Utilities";
import { Form, Field, InputSumbit } from "../../components/ui/Form";
import appContext from "../../context/app/appContext";

export async function getServerSideProps({ params }) {
    try {
        const { url } = params;
        const result = await axiosClient.get(`/api/links/${url}`);
        return {
            props: {
                ...result.data,
                error: false,
            },
        };
    } catch (error) {
        return {
            props: {
                error: true,
            },
        };
    }
}

export default (props) => {
    const { url, filename, org_filename, hasPassword, error } = props;

    const AppContext = useContext(appContext);
    const { file_message, showAlert } = AppContext;

    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");

    const redirectHome = () => {
        router.push("/");
    };

    const verifyPassword = async (e) => {
        e.preventDefault();

        if (password == "") {
            showAlert("Password is required", false, true, false);
        } else {
            try {
                const data = {
                    password,
                };
                const result = await axiosClient.post(
                    `/api/links/${url}`,
                    data
                );
                setValidated(result.data.validated);
            } catch (error) {
                showAlert(error.response.data.msg, false, true, false);
            }
        }
    };

    return (
        <Layout>
            {error ? (
                <>
                    <Title>Enlace inválido</Title>
                    <Card>
                        <p>
                            Si la URL es correcta, puede que el archivo ya haya
                            alcanzado su límite de descargas y haya sido
                            eliminado. Suba el archivo de nuevo para generar una
                            nueva URL.
                        </p>
                        <Button onClick={redirectHome}>
                            Subir un nuevo archivo
                        </Button>
                    </Card>
                </>
            ) : (
                <>
                    <Title>Descarga tu archivo</Title>
                    {hasPassword && !validated ? (
                        <Form onSubmit={verifyPassword}>
                            <Field>
                                <label htmlFor="password">
                                    Este archivo está protegido con contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña del archivo"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                ></input>
                            </Field>
                            <InputSumbit
                                type="submit"
                                value="Desbloquear Archivo"
                            />
                            {file_message && (
                                <Alert
                                    success={file_message.success}
                                    error={file_message.error}
                                    info={file_message.info}
                                >
                                    {file_message.message}
                                </Alert>
                            )}
                        </Form>
                    ) : (
                        <Card>
                            <p>
                                <span>Archivo:</span> {org_filename}
                            </p>
                            <Button
                                href={`${process.env.backendURL}/api/files/${filename}`}
                            >
                                Descargar
                            </Button>
                        </Card>
                    )}
                </>
            )}
        </Layout>
    );
};
