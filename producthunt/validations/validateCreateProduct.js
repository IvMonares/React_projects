export default function validateCreateProduct(values) {
    let errors = {};

    //validate name
    if (!values.name) {
        errors.name = "El nombre del producto es obligatorio";
    }

    //validate company
    if (!values.company) {
        errors.company = "El nombre de la empresa es obligatorio";
    }

    //validate image
    // TODO

    //validate url
    if (!values.url) {
        errors.url = "La URL del producto es obligatoria";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "La URL está mal formateada o no válida";
    }

    //validate description
    if (!values.description) {
        errors.description = "Agrega una descripción del producto";
    }

    return errors;
}
