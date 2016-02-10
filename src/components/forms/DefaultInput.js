import React from 'react';
import Formsy from 'formsy-react'

export const DefaultInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
          <input
            type={this.props.type || 'text'}
            name={this.props.name}
            className='form-control'
            onChange={this.changeValue}
            value={this.getValue()}
            checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
          />
          {this.props.children}
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});
