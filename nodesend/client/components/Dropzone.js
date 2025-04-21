import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import { DropzoneBox, FileList } from "./ui/Dropzone";
import { Alert, Button } from "./ui/Utilities";
import Spinner from "./ui/Spinner";
import LinkForm from "./LinkForm";

const Dropzone = () => {
    // Access authentication context
    const AuthContext = useContext(authContext);
    const { user } = AuthContext;

    // Access app context
    const AppContext = useContext(appContext);
    const {
        loading,
        file_message,
        showAlert,
        uploadFile,
        createLink,
    } = AppContext;

    // Handle file selection
    const onDropAccepted = useCallback(async (acceptedFiles) => {
        const data = new FormData();
        data.append("file", acceptedFiles[0]);

        uploadFile(data, acceptedFiles[0].path);
    }, []);

    const onDropRejected = () => {
        showAlert(
            "El límite es 1MB. Crea una cuenta gratis para subir archivos mayores.",
            false,
            true,
            false
        );
    };

    // Extract Dropzone content
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        acceptedFiles,
    } = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxSize: 1000000,
    });

    const files = acceptedFiles.map((file) => {
        let sizeString = "";

        if (file.size / Math.pow(1024, 2) >= 1) {
            sizeString = (file.size / Math.pow(1024, 2)).toFixed(2) + " MB";
        } else if (file.size / 1024 >= 1) {
            sizeString = (file.size / 1024).toFixed(2) + " KB";
        } else {
            sizeString = file.size + " Bytes";
        }

        return (
            <li key={file.lastModified}>
                <p>{file.path}</p>
                <p>
                    <span>{sizeString}</span>
                </p>
            </li>
        );
    });

    return (
        <div className="contained">
            {file_message && (
                <Alert
                    success={file_message.success}
                    error={file_message.error}
                    info={file_message.info}
                >
                    {file_message.message}
                </Alert>
            )}
            <DropzoneBox>
                {acceptedFiles.length > 0 ? (
                    <FileList>
                        <h4>Tus Archivos</h4>
                        <ul>{files}</ul>

                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                {user ? <LinkForm userId={user.id} /> : null}

                                <Button
                                    bg_color="rgba(29, 78, 216, 1)"
                                    onClick={createLink}
                                >
                                    Crear Enlace
                                </Button>
                            </>
                        )}
                    </FileList>
                ) : (
                    <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />

                        {isDragActive ? (
                            <>
                                <p>Suelta tu achivo aquí</p>
                            </>
                        ) : (
                            <div>
                                <p>Selecciona un archivo y arrástralo aquí </p>
                                <Button bg_color="rgba(29, 78, 216, 1)">
                                    Selecciona archivos para subir
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </DropzoneBox>
        </div>
    );
};

export default Dropzone;
