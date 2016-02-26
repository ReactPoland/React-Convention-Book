import React from 'react';
import Formsy from 'formsy-react';
import { SelectField, MenuItem } from 'material-ui';

export const DefaultSelect = React.createClass({
  mixins: [Formsy.Mixin],

  getDefaultProps() {
    return {
      onChange: () => {}
    };
  },

  changeValue(event, index, value) {
    this.setValue(value);
    this.props.onChange(value);
  },

  componentDidMount() {
    this.setValue(this.props.value || "");
  },

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.value !== this.getValue()) {
  //     this.setValue(nextProps.value);
  //   }
  // },

  render() {
    const errorMessage = this.getErrorMessage();
    const options = this.props.options.map((option, i) => (
      <MenuItem
        value={option}
        key={option}
        primaryText={option} />
    ));

    let placeholder = null;
    if(this.props.placeholder) {
      placeholder = (
        <option value="" disabled defaultSelected>{this.props.placeholder}</option>
      );
    }

    return (
      <div>
        <SelectField
          name={this.props.name}
          tabIndex={this.props.tabindex}
          floatingLabelText={this.props.title}
          floatingLabelStyle={{fontWeight: 300}}
          onChange={this.changeValue}
          fullWidth
          required={this.props.required}
          errorText={errorMessage}
          value={this.getValue()}>
            {options}
        </SelectField>
      </div>
    );
  }
});
