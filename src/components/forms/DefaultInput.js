import React from 'react';
import Formsy from 'formsy-react'
import {TextField} from 'material-ui';

export const DefaultInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },

  render() {
    const errorMessage = this.getErrorMessage();

    return (
      <div>
        <TextField
          floatingLabelText={this.props.title}
          floatingLabelStyle={{fontWeight: 300}}
          fullWidth={(this.props.style && !this.props.style.width) || true}
          style={this.props.style}
          autoFocus={this.props.autoFocus}
          ref={this.props.name}
          errorText={errorMessage}
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          onBlur={this.props.onBlur}
          required={this.props.required}
          defaultValue={this.props.value || this.getValue()} />
        {this.props.children}
      </div>
    );
  }
});
