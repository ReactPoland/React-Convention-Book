import React from 'react';
import { Form } from 'formsy-react';
import { DefaultInput } from 'components/forms/DefaultInput';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this._filter = this._filter.bind(this);
  }

  _filter(e) {
    // Filteres array from props and returns new
    let data = this.props.data;
    let filter = e.target.value.trim().toLowerCase();
    if(filter.length > 0) {
      data = data.filter(
        d => d[this.props.filterBy].toLowerCase().indexOf(filter) > -1
      );
    }
    this.props.onFilter(data);
  }

  render() {
    return (
      <Form className='form-inline pull-left' style={this.props.style}>
        <DefaultInput
          name="Filter"
          type='text'
          title={this.props.placeholder}
          required
          onChange={this._filter}
          placeholder={this.props.placeholder} />
      </Form>
    );
  }
}
