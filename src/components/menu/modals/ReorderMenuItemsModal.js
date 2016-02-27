import React from 'react';
import update from 'react/lib/update';
import {
  Dialog,
  FlatButton,
  Paper
} from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

import ReorderItemsWrapper from 'components/dnd/ReorderItemsWrapper';

function prepareSections(props) {
  if(props.menu) {
    let { sections } = props.menu;

    if(sections) {
      sections = (sections || []).map((id) => {
        const full = props.fullSections.get(id);
        return {
          id,
          title: full.title,
          items: full.items.map((itemId) => {
            return props.fullItems.get(itemId);
          })
        };
      });
      return sections;
    }
  }

  return [];
}

export default class ReorderMenuItemsModal extends React.Component {
  constructor(props) {
    super(props);

    this._onDone = this._onDone.bind(this);

    this.state = {
      sections: prepareSections(this.props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.menu && nextProps.menu !== this.props.menu) {
      this.setState({
        sections: prepareSections(nextProps)
      });
    }
  }

  _onDone() {
    this.props.onDone(this.state.sections);
  }

  // section - the one to which item should be added
  // newOrder - items :)
  // item - dropped item
  onUpdateOrder(section, newOrder, item) {
    let sections = this.state.sections.slice();

    for(let i = 0; i < sections.length; i++) {
      const items = sections[i].items.slice();

      if(sections[i].id !== section.id) {
        for(let j = 0; j < items.length; j++) {
          if(item === items[j]) {
            items.splice(j, 1);
            sections[i].items = items;
            this.setState({
              sections
            });
          }
        }
      } else {
        const sectionIndex = sections.indexOf(section);
        sections[sectionIndex].items = newOrder;
        this.setState({sections});
      }
    }
  }

  onDeleteItem(section, item) {
    const index = this.state.sections.indexOf(section);
    const sections = this.state.sections.slice();
    const items = section.items.slice();
    const itemIndex = items.indexOf(item);
    items.splice(itemIndex, 1);
    section.items = items;
    sections[index] = section;
    this.setState({sections});
  }

  render() {
    const { sections } = this.state;
    const actionBtns = [
      <FlatButton label="Cancel" onClick={this.props.onHide} />,
      <FlatButton label="Save" primary={true} onClick={this._onDone} />
    ];

    return (
      <Dialog
        open={this.props.open}
        title="Reorder menu items"
        actions={actionBtns}>

        {this.state.sections.map((section) => {
          return (
            <Paper zDepth={0} style={{border: '1px solid #e0e0e0', marginBottom: 24}} key={section.id}>
              <h4 style={{fontWeight: 'normal', padding: 8, marginTop: -8, color: '#fff', background: Colors.cyan500}}>{section.title}</h4>
              <ReorderItemsWrapper
                onChange={this.onUpdateOrder.bind(this, section)}
                items={section.items}
                onDelete={this.onDeleteItem.bind(this, section)} />
            </Paper>
          );
        })}
      </Dialog>
    );
  }
}
