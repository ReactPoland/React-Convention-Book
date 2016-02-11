import React from 'react';
import Formsy from 'formsy-react'

export const DefaultSelect = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },

  componentWillMount() {
    this.setValue("");
  },

  render() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();
    const options = this.props.options.map((option, i) => (
      <option key={option.title+option.value} value={option.value}>
        {option.title}
      </option>
    ));

    let placeholder = null;
    if(this.props.placeholder) {
      placeholder = (
        <option value="" disabled defaultSelected>{this.props.placeholder}</option>
      );
    }

    return (
      <div className={className}>
        <label htmlFor={this.props.name} className='control-label'>{this.props.title}</label>
        <select name={this.props.name} onChange={this.changeValue} value={this.getValue()} className='form-control' tabIndex={this.props.tabindex}>
          {placeholder}
          {options}
        </select>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});
