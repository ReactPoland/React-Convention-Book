import React, { PropTypes } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ItemTypes from 'constants/DNDItemTypes';

import ReorderDraggableBox from 'components/dnd/ReorderDraggableBox';

const dropTarget = {
  hover(props, monitor, component) {
    alert('kurwa mać! 1')
    consolle.log(monitor.getItem())
  },

  drop() {
    alert('kurwa mać! 2')
  }
}

@DropTarget(ItemTypes.DROP_FIELD, dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({shallow: false})
}))
class Inside extends React.Component {
  static defaultProps = {
    items: [],
    onChange: () => {}
  }

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.moveItem = this.moveItem.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      items: this.props.items
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.items !== this.props.items) {
      this.setState({
        items: nextProps.items
      });
    }
  }

  moveItem(dragItem, hoverIndex) {
    const { items } = this.state;
    const dragIndex = items.indexOf(dragItem);
    let newOrder;

    if(dragIndex !== -1) {
      newOrder = update(this.state, {
        items: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem]
          ]
        }
      });
    } else {
      newOrder = update(this.state, {
        items: {
          $push: [dragItem]
        }
      });
    }

    this.setState(newOrder);
    this.props.onChange(newOrder.items, dragItem);
  }

  getData() {
    return this.state.items;
  }

  render() {
    const { connectDropTarget } = this.props;
    const items = (this.state.items || []).map((item, index) => {
      /* use title as a key if item is newly created and doesn't have id yet */
      return (
        <ReorderDraggableBox
          item={item}
          index={index}
          id={item.id || item.title}
          key={item.id || item.title}
          moveItem={this.moveItem}
          onDelete={this.props.onDelete} />
      );
    });
    const styles = items.length
      ? {overflow: 'auto', maxHeight: 'inherit', padding: '24px', background: this.props.isDragging ? 'red' : ''}
      : {maxHeight: 'inherit', margin: 24, padding: '24px', height: 75, border: '3px dashed #e0e0e0', background: this.props.isDragging ? 'red' : ''}
console.log(this.props.isOver, this.props.isOverCurrent)
    return connectDropTarget(
      <div style={styles}>
        {
          items.length
          ? items
          : <p>There are no items on this list</p>
        }
      </div>
    );
  }
}

@DragDropContext(HTML5Backend)
export default class ReorderItemsWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Inside
        id="2132121"
        {...this.props} />
    );
  }
};
