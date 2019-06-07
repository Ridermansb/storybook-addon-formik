import React from "react";
import { storiesOf } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import withFormik from "../../dist";

const validate = values => {
  let errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

storiesOf("<LoginForm>")
  .addDecorator(
    withFormik({
      validate,
      initialValues: { email: "", password: "" }
    })
  )
  .add("default", ({ formikBag }) => <LoginForm {...formikBag} />)
  .add("other", ({ formikBag }) => <LoginForm {...formikBag} />);
