import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react'
import {Checkbox} from 'material-ui';

var unmountTextFieldHandler = null;

export const DefaultCheckbox = React.createClass({
  mixins: [Formsy.Mixin],

  getDefaultProps() {
    return {
      onCheck: () => {}
    };
  },

  changeValue(event, value) {
    console.log(value);
    this.setValue(event.currentTarget.checked);
    this.props.onCheck(value);
  },

  render() {
    let val = this.getValue();
    return (
      <div>
        <Checkbox
          name={this.props.name}
          label={this.props.label}
          defaultChecked={this.props.defaultChecked}
          onCheck={this.changeValue}
          style={this.props.style}
          checked={this.getValue()}
           />
      </div>
    );
  }
});
