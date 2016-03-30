import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import {
  Paper,
  IconButton
} from 'material-ui';
import {
  ActionOpenWith,
  ActionDelete,
  EditorModeEdit
} from 'material-ui/lib/svg-icons';
import Colors from 'material-ui/lib/styles/colors';

import Styles from 'styles/inlineStyles';
import ItemTypes from 'constants/DNDItemTypes';
/**
 *
 * If you have any troubles see example on which I was basing:
   https://github.com/gaearon/react-dnd/tree/master/examples/04%20Sortable/Simple
 *
   or docs and tutorial:
   http://gaearon.github.io/react-dnd/docs-overview.html
 *
 *
 */

const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      item: props.item
    };
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const hoverItem = props.item;
    const dragItem = monitor.getItem().item;

    if(hoverItem === dragItem) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveItem(dragItem, hoverIndex);
  }
}

@DropTarget(ItemTypes.ORDER_ENTITY, itemTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.ORDER_ENTITY, itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class ReorderDraggableBox extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { item, connectDragSource, connectDropTarget, isDragging } = this.props;
    const zDepth = isDragging ? 2 : 0;
    const allowDelete = !!this.props.onDelete;
    const styles = Styles.dnd.draggableBox;
    const wrapperStyle = isDragging ? styles.wrapper : {};
    let deleteButton = null;

    if(allowDelete) {
      console.info("styles.deleteBtn", styles.deleteBtn);
      deleteButton = (
        <div>
            
            <IconButton style={{position: "absolute", top: 6, right: 40}} onClick={this.props.onEdit.bind(this, item)}>
              <EditorModeEdit color={Colors.grey300} hoverColor={Colors.red800} />
            </IconButton>
            <IconButton style={styles.deleteBtn} onClick={this.props.onDelete.bind(this, item)}>
              <ActionDelete color={Colors.grey300} hoverColor={Colors.red800} />
            </IconButton>
        </div>
      );
    }

    return connectDragSource(connectDropTarget(
      <div style={wrapperStyle}>
        <Paper zDepth={zDepth} style={styles.paper}>
          <div style={styles.icons}>
            <ActionOpenWith
              color={isDragging ? Colors.cyan500 : Colors.grey500}
              hoverColor={Colors.cyan500} />
          </div>
          <span style={styles.title}>{item.title}</span>
          {deleteButton}
        </Paper>
      </div>
    ));
  }
}
