import React, { PropTypes } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Colors from 'material-ui/lib/styles/colors';

import ItemTypes from 'constants/DNDItemTypes';
// onEdit
import ReorderDraggableBox from 'components/dnd/ReorderDraggableBox';

const dropTarget = {
  hover(props, monitor, component) {
    component.setState({
      over: monitor.isOver({shallow: true})
    });
  },

  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if(hasDroppedOnChild) {
      return;
    }

    component.moveItem(monitor.getItem().item, 0);
  }
}

const getStyles = (length, dye) => ({
  overflow: length ? 'auto' : 'hidden',
  maxHeight: 'inherit',
  padding: '24px',
  margin: length ? 0 : 24,
  height: length ? 'auto' : 75,
  borderStyle: 'dashed',
  borderWidth: length ? 0 : 3,
  borderColor: dye || '#e0e0e0'
});

@DropTarget(ItemTypes.ORDER_ENTITY, dropTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
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
    this.dyeBorder = this.dyeBorder.bind(this);
    this.undyeBorder = this.undyeBorder.bind(this);

    this.state = {
      items: this.props.items
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
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

  dyeBorder() {
    this.setState({dye: Colors.cyan500});
  }

  undyeBorder() {
    this.setState({dye: '#e0e0e0'});
  }

  render() {
    const { connectDropTarget } = this.props;
    const items = (this.state.items || []).map((item, index) => {
      /* use title as a key if item is newly created and doesn't have id yet */
      if(!item) return null; // this cases covers when someone has removed an item

      return (
        <ReorderDraggableBox
          item={item}
          index={index}
          id={item.id || item.title}
          key={item.id || item.title}
          moveItem={this.moveItem}
          onDelete={this.props.onDelete}
          onEdit={this.props.onEdit} />
      );
    });
    const styles = getStyles(items.length, this.state.dye);

    return connectDropTarget(
      <div style={styles} onDragEnter={this.dyeBorder} onDragLeave={this.undyeBorder}>
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
        {...this.props} />
    );
  }
};
