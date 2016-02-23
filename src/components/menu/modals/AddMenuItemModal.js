import React from 'react';
import {
  Dialog
} from 'material-ui';

export default class AddMenuItemModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog
        title="Add Menu Item"
        open={this.props.open}>
        add menu item
      </Dialog>
    );
  }
}
