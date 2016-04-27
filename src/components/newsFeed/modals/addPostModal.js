import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { Form } from 'formsy-react';
import { DefaultInput } from 'components/forms/DefaultInput';
import { DefaultDatePicker } from 'components/forms/DefaultDatePicker';


export default class AddPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
    this._enableBtn = this._enableBtn.bind(this);
    this._disableBtn = this._disableBtn.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  _enableBtn() {
    this.setState({canSubmit: true});
  }

  _disableBtn() {
    this.setState({canSubmit: false});
  }

  _onSubmit(post) {
    this.props.onSubmit(post);
    this.setState({
      open: false
    });
  }
  render() {
    const btnStyle = {
      position: 'fixed',
      bottom: 48,
      right: 48
    };

    const footerStyles = {
      marginTop: 24,
      textAlign: 'right'
    };

    return (
      <div>
        <FloatingActionButton style={btnStyle} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add Post"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <Form
            ref="form"
            onValid={this._enableBtn}
            onInvalid={this._disableBtn}
            onSubmit={this._onSubmit}>
            <DefaultInput
              tabIndexProp="100000"
              name="title"
              title="Title"
              retuired
              validations="isExisty"
              validationError="Title is required" />
            <DefaultInput
              tabIndexProp="100001"
              name="message"
              title="Message"
              retuired
              validations="isExisty"
              validationError="Title is required" />

            <div style={footerStyles}>
             <FlatButton label="Close" onClick={this.handleClose} />
              <FlatButton label={ "Create" } primary={true} disabled={!this.state.canSubmit} type="submit" />
            </div>
          </Form>
        </Dialog>
      </div>
    );
  }
}
