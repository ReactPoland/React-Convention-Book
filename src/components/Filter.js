import React from 'react';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this._filter = this._filter.bind(this);
  }

  _filter(e) {
    // Filteres array from props and returns new
    let data = this.props.data,
        filter = e.target.value.trim().toLowerCase();
    if (filter.length > 0) {
      data = data.filter(
        d => d[this.props.filterBy].toLowerCase().indexOf(filter) > -1
      );
    }
    this.props.onFilter(data);
  }

  render() {
    return (
      <div className='form-inline pull-left'>
        <input type='text' className='form-control' required onChange={this._filter} placeholder={this.props.placeholder} />
      </div>
    );
  }
}
