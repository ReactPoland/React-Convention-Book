import React from 'react';
import {
  Dialog,
  FlatButton,
  FloatingActionButton
} from 'material-ui';
import {
  ContentAdd
} from 'material-ui/lib/svg-icons';
import Colors from 'material-ui/lib/styles/colors';
import { Form } from 'formsy-react';

import { Section } from 'models';

import { DefaultInput } from 'components/forms/DefaultInput';
import ReorderItemsWrapper from 'components/dnd/ReorderItemsWrapper';

export default class EditMenuSectionsModal extends React.Component {
  constructor(props) {
    super(props);

    this._onDone = this._onDone.bind(this);
    this._enableButton = this._enableButton.bind(this);
    this._disableButton = this._disableButton.bind(this);
    this._unlockInput         = this._unlockInput.bind(this);
    this._lockInputAndSave         = this._lockInputAndSave.bind(this);
    this.onSectionEdit         = this.onSectionEdit.bind(this);

    this.state = {
      sections: this._getSections(this.props),
      sectionInEdit: null
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
      return this.props.fullSections.get(section);
    });
    return sections;
  }

  _unlockInput(section) {
    this.setState({
      sectionInEdit: section.id
    });
  }

  _onDone() {
    const menuSections = this.state.sections.slice();
    this.props.onDone(menuSections);
    this.props.onHide();
  }

  _onSectionAdd(value) {
    value.items = [];
    const section = new Section(value);
    const stateSections = this.state.sections.slice();
    const sections = stateSections.concat(section);

    this.setState({
      sections,
      addInputOpen: false
    });
  }

  onSectionDelete(section) {
    const sections = this.state.sections.slice();
    sections.splice(sections.indexOf(section), 1);
    this.setState({sections});
  }

  onSectionEdit(section) {
    this._unlockInput(section)

  }

  _lockInputAndSave() {
    const title = this.refs[this.state.sectionInEdit].getValue();
    if(title === undefined) { 
      this.setState({
        sectionInEdit: null
      });
      return;
    }

    const originSection = this.props.section.get(this.state.sectionInEdit);
    const newSection = new Section(originSection.formatForWire());
    newSection.title = title;

    this.props.onUpdate(newSection);
    this.setState({
      sectionInEdit: null
    });
  }

  updateOrder(newOrder) {
    this.setState({sections: newOrder});
  }

  _enableButton() {
    this.setState({canSubmit: true});
  }

  _disableButton() {
    this.setState({canSubmit: false});
  }

  render() {
    const { fullSections } = this.props;
    const currentSections = this.state.sections;
    const availableSections = [];
    let nameNodeEdit = <span />;
    let topPadding = 30;

    let sectionID = this.state.sectionInEdit;
    if(sectionID) {
      let section = this.props.section.get(sectionID);
      topPadding = 0;
      nameNodeEdit = (
        <Form>
          <div>
            <DefaultInput
              defaultValue={section.title}
              name={section.id}
              ref={section.id}
              autoFocus
              required
              onEnterKeyDown={this._lockInputAndSave} />
          </div>
        </Form>
      );
      // let nameNode = <span style={{color: 'red', topPadding: 10}}>{section.title} [editing - ENTER to submit changes] </span>;
    }


    const actionBtns = [
      <FlatButton label="Cancel" onClick={this.props.onHide} />,
      <FlatButton label="Save" primary={true} onClick={this._onDone} />
    ];

    fullSections.forEach((section) => {
      const isThere = !!currentSections.find((s) => (s || {}).id === section.id);
      return !isThere ? availableSections.push(section) : false;
    });

    const options = availableSections.map((section) => ({
      title: section.title,
      value: section.id
    }));


    console.info("\n\n\n\n\n\n 5555 this.onSectionEdit \n\n\n "
      ,this.onSectionEdit
      ,"\n\n\n\n\n\n 5555 this.onSectionEdit \n\n\n ");




    return (
      <Dialog
        open={this.props.open}
        title="Edit menu sections"
        actions={actionBtns}>
        {nameNodeEdit}
        <ReorderItemsWrapper
          onChange={this.updateOrder.bind(this)}
          items={this.state.sections}
          onDelete={this.onSectionDelete.bind(this)} 
          onEdit={this.onSectionEdit.bind(this)} />

        <div style={{
            position: 'absolute',
            height: 100,
            bottom: 16,
            width: 370,
            overflow: 'hidden'
          }}>
          <Form
            ref="form"
            style={{
              width: 300,
              position: 'absolute',
              left: this.state.addInputOpen ? 64 : '-100%',
              bottom: 8,
              transition: 'left .3s ease-out'
            }}
            onSubmit={this._onSectionAdd.bind(this)}
            onValid={this._enableButton}
            onInvalid={this._disableButton}>
            <DefaultInput
              title="Section Name"
              name="title"
              style={{
                width: 200
              }}
              required
              placeholder="Section Name" />

            <FlatButton
              label="ok"
              primary={true}
              type="submit"
              disabled={!this.state.canSubmit}
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0
              }} />
          </Form>
          <FloatingActionButton
            mini={true}
            style={{bottom: 8, left: 8, position: 'absolute'}}
            onClick={() => this.setState({addInputOpen: !this.state.addInputOpen})}>
            <ContentAdd color={Colors.white} />
          </FloatingActionButton>
        </div>

      </Dialog>
    );
  }
}
