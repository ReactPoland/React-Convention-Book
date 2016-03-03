import React from 'react';
import {
  Dialog,
  FlatButton
} from 'material-ui';
import { Form } from 'formsy-react';

import { MenuItem } from 'models';

import Allergens from 'components/menu/Allergens';
import AddToMenu from 'components/menu/AddToMenu';
import { DefaultInput } from 'components/forms/DefaultInput';
import { DefaultDatePicker } from 'components/forms/DefaultDatePicker';

const d = new Date();
const today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

const headerStyle = {
  margin: '32px auto -12px'
};

const footerStyles = {
  marginTop: 24,
  textAlign: 'right'
};

export default class AddMenuItemModal extends React.Component {
  constructor(props) {
    super(props);

    this._onDone = this._onDone.bind(this);
    this._enableBtn = this._enableBtn.bind(this);
    this._disableBtn = this._disableBtn.bind(this);
    this.onSectionsChange = this.onSectionsChange.bind(this);
    this.onAllergensChange = this.onAllergensChange.bind(this);

    this.state = {
      canSubmit: false
    };
  }

  componentWillMount() {
      if(this.props.editItemId && this.state.canSubmit === false) {
        let editedItem = this.props.menuItems.get(this.props.editItemId);
        this._enableBtn();
        // TODO - refactor delete setState somewhere else
        this.setState({editedItem: editedItem});
      }
  }

  componentWillUpdate() {
      if(this.props.editItemId && this.state.canSubmit === false) {
        let editedItem = this.props.menuItems.get(this.props.editItemId);
        this._enableBtn();
        // TODO - refactor delete setState somewhere else
        this.setState({editedItem: editedItem});
      }
  }

  _onDone(formData) {
    if(this.state.editedItem) {
      // only in edit mode
      for(var key in this.state.editedItem) {
        let formValue = formData[key];
        if(!formValue) {
          // is empty / not changed - give it default value
          formData[key] = this.state.editedItem[key];
        }
      }
    }
    const item = Object.assign({}, formData);

    console.info("item do ADD/EDIT", item);
    item.allergens = this.state.allergens;
    let newMenuItem = new MenuItem(item);
    if(this.props.editItemId) newMenuItem.id = this.props.editItemId;
    this.props.onDone(newMenuItem, this.state.sectionsMap);
  }

  _enableBtn() {
    this.setState({canSubmit: true});
  }

  _disableBtn() {

    this.setState({canSubmit: false});
  }

  onSectionsChange(sectionsMap) {
    this.setState({
      sectionsMap
    });
  }

  onAllergensChange(allergens) {
    this.setState({
      allergens
    });
  }

  render() {
    let editItemId = this.props.editItemId;
    let editedItem;
    if(editItemId) {
      console.log("EDIT MODE ON!!!"+this.props.editItemId);
      editedItem = this.props.menuItems.get(editItemId);

      console.log(this.props.menuItems);
      console.log("menu items ^^^");
      console.log(editedItem);
      console.log(editedItem.date);
      console.log("ITEM ^^^");
      console.log("title: ", editedItem.title)
      console.log("this.props.menus", this.props.menus);
    }
    return (
      <Dialog
        title={this.props.title}
        open={this.props.open}
        autoScrollBodyContent>
        <Form onSubmit={this._onDone} ref="form" onValid={this._enableBtn} onInvalid={this._disableBtn}>
          <DefaultInput
            name="title"
            title="Name"
            defaultValue={ editedItem ? editedItem.title : "" }
            required
            validations="isExisty"
            validationError="Name is required" />

          <DefaultDatePicker
            name="date"
            autoOk
            defaultValue={today}
            container="dialog"
            mode="landscape"
            required
            validations="isExisty"
            validationError="Invalid date" />

          <DefaultInput
            name="description"
            title="Description (Level 1)"
            defaultValue={ editedItem ? editedItem.description : "" }
            required
            rows={5}
            validations="isExisty"
            validationError="Description is required"
            multiLine={true} />

          <DefaultInput
            name="description2"
            defaultValue={ editedItem ? editedItem.description2 : "" }
            title="Description (Level 2)"
            rows={5}
            multiLine={true} />

          <DefaultInput
            name="description3"
            title="Description (Level 3)"
            defaultValue={ editedItem ? editedItem.description3 : "" }
            rows={5}
            multiLine={true} />

          <h4 style={headerStyle}>Allergens</h4>
          <hr />
          <Allergens mode="edit" allergens={ editedItem ? editedItem.allergens : undefined /* if undefined then is using defaultProps */ }  onChange={this.onAllergensChange} />

          <h4 style={headerStyle}>Add to menu</h4>
          <hr />
          <AddToMenu
            editItemId={editItemId}
            onChange={this.onSectionsChange}
            menus={this.props.menus}
            sections={this.props.sections} />

          <div style={footerStyles}>
            <FlatButton label="Close" onClick={this.props.onHide} />
            <FlatButton label="Create" primary={true} disabled={!this.state.canSubmit} type="submit" />
          </div>
        </Form>
      </Dialog>
    );
  }
}
