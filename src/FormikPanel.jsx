import React, { PureComponent } from "react";
import {
  ADDON_ID,
  PANEL_ID,
  VALUES_CHANGED_EVENT_ID,
  ERRORS_CHANGED_EVENT_ID
} from "./constants";

export default class extends PureComponent {
  static displayName = "FormikPanel";

  state = {
    values: {},
    errors: {}
  };
  constructor(...args) {
    super(...args);
    this._onValuesChanged = values => this.setState({ values });
    this._onErrorsChanged = errors => this.setState({ errors });
  }

  componentDidMount() {
    const { channel } = this.props;
    channel.on(VALUES_CHANGED_EVENT_ID, this._onValuesChanged);
    channel.on(ERRORS_CHANGED_EVENT_ID, this._onErrorsChanged);
  }

  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener(VALUES_CHANGED_EVENT_ID, this._onValuesChanged);
    channel.removeListener(ERRORS_CHANGED_EVENT_ID, this._onErrorsChanged);
  }

  render() {
    const { values, errors, formikReady } = this.state;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 40px"
        }}
      >
        <div style={{ width: "50%" }}>
          <strong>Values</strong>
          <pre>{JSON.stringify(values, 2, 2)}</pre>
        </div>

        <div style={{ width: "50%" }}>
          <strong>Errors</strong>
          <pre>{JSON.stringify(errors, 2, 2)}</pre>
        </div>
      </div>
    );
  }
}
