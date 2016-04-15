import React from 'react';
import { Dialog, FlatButton, Checkbox } from 'material-ui';
import { Menu } from 'models';
import { Form } from 'formsy-react';

import { DefaultInput } from 'components/forms/DefaultInput';

export default class AddMenuModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      showAllergensInMenu: false
    };

    this._enableButton = this._enableButton.bind(this);
    this._disableButton = this._disableButton.bind(this);
    this._onDone = this._onDone.bind(this);
    this._onSubmitClick = this._onSubmitClick.bind(this);
  }

  _enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  _disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  _onDone(menu) {
    menu.showAllergensInMenu = this.state.showAllergensInMenu;
    menu = new Menu(menu);
    this.props.onHide && this.props.onHide();
    this.props.onDone && this.props.onDone(menu);
  }

  _onSubmitClick() {
    this.refs.form.submit();
  }

  render() {
    const actionBtns = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.onHide} />,
      <FlatButton
        label="Create"
        onTouchTap={this._onSubmitClick}
        disabled={!this.state.canSubmit}
        secondary={this.state.canSubmit} />
    ];

    return (
      <Dialog {...this.props} title="Add menu" actions={actionBtns}>
        <Form onSubmit={this._onDone} ref="form" onValid={this._enableButton} onInvalid={this._disableButton}>
          <DefaultInput
            title="Menu name"
            required
            validations="isExisty"
            validationError="Invalid name"
            name="title" />
            <Checkbox
              defaultChecked={this.state.showAllergensInMenu}
              name="checkboxShowAllergensInMenu"
              label={<span>Show allergen guide</span>}
              onCheck={() => {this.setState({ showAllergensInMenu: !this.state.showAllergensInMenu})}} />
        </Form>
      </Dialog>
    );
  }
};
