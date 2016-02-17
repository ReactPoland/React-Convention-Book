import React, { PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import HTML5Backend from 'react-dnd-html5-backend';

import ReorderDraggableBox from 'components/dnd/ReorderDraggableBox';

@DragDropContext(HTML5Backend)
export default class ReorderItemsWrapper extends React.Component {
  static defaultProps = {
    items: []
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
    this.setState({
      items: nextProps.items
    });
  }

  moveItem(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragItem = items[dragIndex];
    const newOrder = update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    });

    this.setState(newOrder);
    this.props.onChange && this.props.onChange(newOrder.items);
  }

  getData() {
    return this.state.items;
  }

  render() {
    const items = (this.state.items || []).map((menu, index) => {
      return (
        <ReorderDraggableBox
          item={menu}
          id={menu.id}
          index={index}
          key={menu.id}
          moveItem={this.moveItem}
          onDelete={this.props.onDelete} />
      );
    });

    return (
      <div style={{overflow: 'auto', maxHeight: 'inherit', padding: '24px'}}>
        {
          items.length
          ? items
          : <p>There are no items on this list</p>
        }
      </div>
    );
  }
}
