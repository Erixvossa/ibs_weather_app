import React, { useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

const Formm = ({ status, errors, touched, getCity }) => {
    useEffect(() => {
        status && getCity(status);
    }, [status, getCity]);

    return (
        <div className="search-form-container">
            <div className="search-form-container__search-form">
                <Form>

                    <Field className="search-form-container__input" type="text" placeholder="Введите город" id="city" name="value" />

                    <button className="search-form-container__button" type="submit">Search</button>
                    {errors.value && touched.value && (
                        <h2 className="search-form-container__paragraph">{errors.value}</h2>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default withFormik({
    mapPropsToValues: () => ({
        value: ""
    }),
    validationSchema: yup.object().shape({
        value: yup.string().required("Пожалуйста, введите название города")
    }),
    handleSubmit: (values, { resetForm, setStatus }) => {
        setStatus(values);
        resetForm();
    }
})(Formm);