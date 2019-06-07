import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validate = values => {
  let errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export const LoginForm = ({ isSubmitting }) => (
  <Form>
    <Field type="email" name="email" />
    <ErrorMessage name="email" component="div" />
    <Field type="password" name="password" />
    <ErrorMessage name="password" component="div" />
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </Form>
);

const LoginFormContainer = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    validate={validate}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
    render={formikBag => <LoginForm {...formikBag} />}F
  />
);

export default LoginFormContainer;
