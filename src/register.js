import React, { PureComponent } from "react";
import addons, { makeDecorator } from "@storybook/addons";
import { STORY_CHANGED } from "@storybook/core-events";
import FormikPanel from "./FormikPanel";
import {
  ADDON_ID,
  PANEL_ID,
  VALUES_CHANGED_EVENT_ID,
  ERRORS_CHANGED_EVENT_ID
} from "./constants";

addons.register(ADDON_ID, storybookAPI => {
  const channel = addons.getChannel();
  storybookAPI.on(STORY_CHANGED, () => {
    channel.emit(VALUES_CHANGED_EVENT_ID, {});
    channel.emit(ERRORS_CHANGED_EVENT_ID, {});
  });
  addons.addPanel(PANEL_ID, {
    title: "Formik",
    render: <FormikPanel channel={channel} api={storybookAPI} />
  });
});
