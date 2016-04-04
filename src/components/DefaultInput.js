import React from 'react';
import {TextField} from 'material-ui';
import {HOC} from 'formsy-react';

class DefaultInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.state = { currentText: null }

  }

  changeValue(e) {
    this.setState({currentText: e.target.value})
    this.props.setValue(e.target.value);
    this.props.onChange(e);
  }

  render() {
    return (
      <div>
        <TextField
          ref={this.props.name}
          floatingLabelText={this.state.currentText ? '' : this.props.title}
          name={this.props.name}
          onChange={this.changeValue}
          required={this.props.required}
          value={this.props.value} />
        {this.props.children}
      </div>
    );
  }
};
export default HOC(DefaultInput);