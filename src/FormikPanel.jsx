import React, { PureComponent } from "react";
import JsonView from 'react-json-view';
import {
  ADDON_ID,
  PANEL_ID,
  VALUES_CHANGED_EVENT_ID,
  ERRORS_CHANGED_EVENT_ID,
  VALUES_SET_EVENT_ID
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

  handleEdit = val => {
    const { channel } = this.props;
    channel.emit(VALUES_SET_EVENT_ID, val);
  }

  render() {
    const { values, errors } = this.state;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 40px"
        }}
      >
        <div style={{ width: "50%" }}>
          <JsonView src={values} name="Values" onEdit={this.handleEdit} />
        </div>

        <div style={{ width: "50%" }}>
          <JsonView src={errors} name="Errors" />
        </div>
      </div>
    );
  }
}
