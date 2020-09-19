import React, { useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

const Formm = ({ status, errors, touched, getCity }) => {
    useEffect(() => {
        status && getCity(status);
    }, [status, getCity]);

    return (
        <div className="search-form">
            <Form>
                <label htmlFor="">
                    <Field type="text" placeholder="Введите город" id="city" name="value" />
                </label>
                <button className="search-form__button" type="submit">Search</button>
                {errors.value && touched.value && (
                    <p className="">{errors.value}</p>
                )}
            </Form>
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