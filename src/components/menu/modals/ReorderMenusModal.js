import React, { PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import HTML5Backend from 'react-dnd-html5-backend';
import mapHelpers from 'utils/map-immutability-helpers';
import {
  Dialog,
  FlatButton
} from 'material-ui';
import {
  ActionOpenWith
} from 'material-ui/lib/svg-icons';

import ReorderDraggableBox from 'components/dnd/ReorderDraggableBox';

/**
 *
 * I am more than sure that I'll be extracting dnd functionality
 * to a separate component as this feature occurs in several places
 *
 */

@DragDropContext(HTML5Backend)
export default class ReorderMenusModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: mapHelpers.toArray(this.props.menus)
    };

    this.moveItem = this.moveItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: mapHelpers.toArray(this.props.menus)
    });
  }

  moveItem(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragItem = items[dragIndex];

    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    }));
  }

  render() {
    console.log(this.state)
    const menus = (this.state.items || []).map((menu, index) => {
      return (
        <ReorderDraggableBox
          item={menu}
          id={menu.id}
          index={index}
          key={menu.id}
          moveItem={this.moveItem} />
      );
    });

    return (
      <Dialog
        open={this.props.open}>
        {menus}
      </Dialog>
    );
  }
}
