import React from 'react';
import {
  Dialog,
  FlatButton
} from 'material-ui';
import { Form } from 'formsy-react';

import { DefaultSelect } from 'components/forms/DefaultSelect';
import ReorderItemsWrapper from 'components/dnd/ReorderItemsWrapper';

export default class EditMenuSectionsModal extends React.Component {
  constructor(props) {
    super(props);

    this._onDone = this._onDone.bind(this);

    this.state = {
      sections: this._getSections(this.props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sections: this._getSections(nextProps)
    });
  }

  _getSections(props) {
    const { menu } = props;
    const menuSections = menu ? menu.sections : [];
    const sections = menuSections.map((section) => {
      return this.props.fullSections.get(section.id);
    });
    return sections;
  }

  _onDone() {
    const menuSections = this.state.sections.slice();

    this.props.onDone(menuSections);
    this.props.onHide();
  }

  _onSectionAdd(value) {
    const sections = this.state.sections.slice();

    sections.push(this.props.fullSections.get(value));

    this.setState({ sections });
  }

  onSectionDelete(sectionId) {
    const sections = this.state.sections
      .slice()
      .filter((section) => section.id !== sectionId);

    this.setState({sections});
  }

  updateOrder(newOrder) {
    this.setState({sections: newOrder});
  }

  render() {
    const { fullSections } = this.props;
    const currentSections = this.state.sections;
    const actionBtns = [
      <FlatButton label="Cancel" onClick={this.props.onHide} />,
      <FlatButton label="Save" primary={true} onClick={this._onDone} />
    ];
    const availableSections = [];
    fullSections.forEach((section) => {
      const isThere = !!currentSections.find((s) => s.id === section.id);
      return !isThere ? availableSections.push(section) : false;
    });
    const options = availableSections.map((section) => ({
      title: section.title,
      value: section.id
    }));

    return (
      <Dialog
        open={this.props.open}
        title="Edit menu sections"
        actions={actionBtns}>

        <ReorderItemsWrapper
          onChange={this.updateOrder.bind(this)}
          items={this.state.sections}
          onDelete={this.onSectionDelete.bind(this)} />

        <Form style={{margin: '0 24px', maxWidth: 250}}>
          <DefaultSelect
            name="addSection"
            title="Add Section"
            placeholder="Add Section"
            options={options}
            onChange={this._onSectionAdd.bind(this)}
            value={null} />
        </Form>

      </Dialog>
    );
  }
}
