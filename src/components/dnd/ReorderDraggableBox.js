import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from 'constants/DNDItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

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

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
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
    // text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { connectDragSource, connectDropTarget, isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{...style, opacity}}>
        {this.props.item.title}
      </div>
    ));
  }
}
