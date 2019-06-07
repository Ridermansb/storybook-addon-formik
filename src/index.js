import React from "react";
import addons, { makeDecorator } from "@storybook/addons";
import { Formik } from "formik";
import {
  ADDON_ID,
  PANEL_ID,
  VALUES_CHANGED_EVENT_ID,
  ERRORS_CHANGED_EVENT_ID
} from "./constants";

export default makeDecorator({
  name: "withFormik",
  parameterName: "formikProps",
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const formikParams = Object.assign({}, options || {}, context.formikProps);
    const channel = addons.getChannel();

    return (
      <Formik
        {...formikParams}
        render={formikBag => {
          channel.emit(VALUES_CHANGED_EVENT_ID, formikBag.values);
          channel.emit(ERRORS_CHANGED_EVENT_ID, formikBag.errors);
          context.formikBag = formikBag;
          return getStory(context);
        }}
      />
    );
  }
});
