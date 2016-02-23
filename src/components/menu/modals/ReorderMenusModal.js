import React, { PropTypes } from 'react';
import mapHelpers from 'utils/mapHelpers';
import {
  Dialog,
  FlatButton
} from 'material-ui';
import ReorderItemsWrapper from 'components/dnd/ReorderItemsWrapper';

export default class ReorderMenusModal extends React.Component {
  constructor(props) {
    super(props);

    this._onDone = this._onDone.bind(this);

    this.state = {
      items: mapHelpers.toArray(this.props.menus)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: mapHelpers.toArray(this.props.menus)
    });
  }

  _onDone() {
    /// context wrapper doesn't allow me to access child's
    // methods directly. I am not sure if this .refs.child. thing can stay here
    const order = this.refs.reorderBox.refs.child.getData();
    this.props.onDone(order);
    this.props.onHide();
  }

  onChange(order) {
    this.setState
  }

  render() {
    const actionBtns = [
      <FlatButton label="Cancel" onClick={this.props.onHide} />,
      <FlatButton label="Save" primary={true} onClick={this._onDone} />
    ];

    return (
      <Dialog
        actions={actionBtns}
        title="Reorder menus"
        open={this.props.open}>
        <ReorderItemsWrapper
          ref="reorderBox"
          items={this.state.items} />
      </Dialog>
    );
  }
}
