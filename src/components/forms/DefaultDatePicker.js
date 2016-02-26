import React from 'react';
import Formsy from 'formsy-react';
import { DatePicker } from 'material-ui';

export const DefaultDatePicker = React.createClass({
  mixins: [Formsy.Mixin],

  getDefaultProps() {
    return {
      onChange: () => {}
    };
  },

  changeValue(event, value) {
    this.setValue(value);
    this.props.onChange(value);
  },

  componentDidMount() {
    this.setValue(this.props.value || "");
  },

  render() {
    const errorMessage = this.getErrorMessage();

    return (
      <DatePicker
        {...this.props}
        onChange={this.changeValue}
        value={this.getValue()}
        errorText={errorMessage} />
    );
  }
});
