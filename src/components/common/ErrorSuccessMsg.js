import React from 'react';
import { Snackbar } from 'material-ui';

import Styles from 'styles/inlineStyles';

const emptyString = ' ';

export default class ErrorSuccessMsg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: null
    };

    this.onRequestClose = this.onRequestClose.bind(this);
  }

  static defaultProps = {
    autoHideDuration: 5000,
    onRequestClose: () => {},
    successMessage: '',
    errorMessage: ''
  }

  componentWillReceiveProps(nextProps) {
    let open = null;

    if(nextProps.successMessage) {
      open = 'success';
    }
    if(nextProps.errorMessage) {
      open = 'error';
    }

    this.setState({open});
  }

  onRequestClose() {
    this.setState({open: null});
    this.props.onRequestClose();
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open === 'success'}
          message={this.props.successMessage || emptyString}
          autoHideDuration={this.props.autoHideDuration}
          onRequestClose={this.onRequestClose}
          bodyStyle={Styles.snackbar.success} />
        <Snackbar
          open={this.state.open === 'error'}
          message={this.props.errorMessage || emptyString}
          autoHideDuration={this.props.autoHideDuration}
          onRequestClose={this.onRequestClose}
          bodyStyle={Styles.snackbar.error} />
      </div>
    );
  }
};
