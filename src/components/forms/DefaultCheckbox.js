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
    this.setValue(value);
    this.props.onCheck(value);
  },

  render() {    
    return (
      <div>
        <Checkbox
          name={this.props.name}
          label={this.props.label}
          defaultChecked={this.props.defaultChecked}
          onCheck={this.changeValue}
           />
      </div>
    );
  }
});

