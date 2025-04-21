import React, { useState, useEffect } from "react";

const useValidation = (initialState, validationFn, fn) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrors = Object.keys(errors).length == 0;

            if (noErrors) {
                fn();
            }

            setSubmitForm(false);
        }
    }, [errors]);

    //Function to execute as user inputs data
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    //Function to execute as user submits form
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validationFn(values);
        setErrors(validationErrors);
        setSubmitForm(true);
    };

    //Function to execute on input blur
    const handleBlur = () => {
        const validationErrors = validationFn(values);
        setErrors(validationErrors);
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
    };
};

export default useValidation;
