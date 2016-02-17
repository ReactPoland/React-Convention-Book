import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from 'constants/DNDItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import {
  Paper,
  IconButton
} from 'material-ui';
import {
  ActionOpenWith,
  ActionDelete
} from 'material-ui/lib/svg-icons';
import Colors from 'material-ui/lib/styles/colors';

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
      index: props.index
    };
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if(dragIndex === hoverIndex) {
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

    props.moveItem(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
}

const paperStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  position: 'relative',
  border: '1px solid ' + Colors.grey300,
  marginTop: -1
};

const wrapperStyles = {
  margin: 16
};

const iconStyles = {
  position: 'absolute',
  left: 16,
  height: 24,
  overflow: 'hidden'
};

const titleStyles = {
  display: 'inline-block',
  lineHeight: '24px',
  marginLeft: 40
};

const deleteBtnStyles = {
  position: 'absolute',
  top: 6,
  right: 8
};


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
    const wrapperStyle = isDragging ? wrapperStyles : {};
    const allowDelete = !!this.props.onDelete;
    let deleteButton = null;

    if(allowDelete) {
      deleteButton = (
        <IconButton style={deleteBtnStyles} onClick={this.props.onDelete.bind(this, item.id)}>
          <ActionDelete color={Colors.grey300} hoverColor={Colors.red800} />
        </IconButton>
      );
    }

    return connectDragSource(connectDropTarget(
      <div style={wrapperStyle}>
        <Paper zDepth={zDepth} style={paperStyles}>
          <div style={iconStyles}>
            <ActionOpenWith
              color={isDragging ? Colors.cyan500 : Colors.grey500}
              hoverColor={Colors.cyan500} />
          </div>
          <span style={titleStyles}>{item.title}</span>
          {deleteButton}
        </Paper>
      </div>
    ));
  }
}
