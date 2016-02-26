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
    this.onOrderChange = this.onOrderChange.bind(this);

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
    this.props.onDone(this.state.newOrder);
    this.props.onHide();
  }

  onOrderChange(newOrder) {
    this.setState({
      newOrder
    });
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
          onChange={this.onOrderChange}
          ref="reorderBox"
          items={this.state.items} />
      </Dialog>
    );
  }
}
