import { useContext } from "react";
import Layout from "../components/Layout";
import { DropzoneContainer } from "../components/ui/Dropzone";
import { Button, Card } from "../components/ui/Utilities";
import Link from "next/link";
import { useRouter } from "next/router";

import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import Dropzone from "../components/Dropzone";

const Upload = () => {
    // Access authentication context
    const AuthContext = useContext(authContext);
    const { user } = AuthContext;

    // Access app context
    const AppContext = useContext(appContext);
    const { url, clearState } = AppContext;

    // Router
    const router = useRouter();

    const copyLink = () => {
        navigator.clipboard.writeText(
            process.env.frontendURL + "/links/" + url
        );
    };

    const redirectHome = () => {
        clearState();
        router.push("/");
    };

    return (
        <Layout>
            {url ? (
                <Card>
                    <p>
                        <span>Tu URL es:</span>{" "}
                        {process.env.frontendURL + "/links/" + url}
                    </p>
                    <Button onClick={copyLink}>Copiar enlace</Button>
                    <Button onClick={redirectHome}>
                        Subir un nuevo archivo
                    </Button>
                </Card>
            ) : (
                <DropzoneContainer>
                    <div>
                        <h2>Compartir archivos de forma sencilla y privada</h2>
                        <p>
                            <span>React NodeSend</span> te permite compartir
                            archivos con cifrado de extremo a extremo y un
                            archivo que es eliminado despues de ser descargado.
                            Así que puedes mantener lo que comparted en privado
                            y asegurarte de que tus cosas no permanezcan en
                            línea para siempre.
                        </p>
                        {user ? null : (
                            <p>
                                Presiona{" "}
                                <span>
                                    <Link href="/create-account">
                                        <a>aquí</a>
                                    </Link>
                                </span>{" "}
                                para crear una cuenta para mayores beneficios
                            </p>
                        )}
                    </div>
                    <Dropzone />
                </DropzoneContainer>
            )}
        </Layout>
    );
};

export default Upload;
