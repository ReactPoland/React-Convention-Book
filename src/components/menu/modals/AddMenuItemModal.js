import React from 'react';
import {
  Dialog,
  FlatButton
} from 'material-ui';
import { Form } from 'formsy-react';

import { MenuItem, Allergen } from 'models';

import Allergens from 'components/menu/Allergens';
import AddToMenu from 'components/menu/AddToMenu';
import { DefaultInput } from 'components/forms/DefaultInput';
import { DefaultDatePicker } from 'components/forms/DefaultDatePicker';
import CloseClearModalIcon from 'react-material-icons/icons/content/clear';

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
        this.setState({editedItem: editedItem, allergens: editedItem.allergens});
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
    formData.allergens = this.state.allergens;
    if(this.props.editItemId) formData.id = this.props.editItemId;
    const newMenuItem = new MenuItem(formData);

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

  onAllergensChange(allergenName) {
    let allergensState = this.state.allergens;
    allergensState[allergenName] = !allergensState[allergenName];

    this.setState({
      allergensState
    });
  }

  render() {
    let editItemId = this.props.editItemId;
    let editedItem;
    if(editItemId) {
      editedItem = this.props.menuItems.get(editItemId);
    }

    return (
      <div style={{position: 'relative'}}>
      <Dialog  
        title={this.props.title}
        open={this.props.open}
        autoScrollBodyContent>
        <CloseClearModalIcon 
          style={{position: 'absolute', top: 0, right: 0, cursor: 'pointer'}} 
          onClick={this.props.onHide} />
        <Form onSubmit={this._onDone.bind(this)} ref="form" onValid={this._enableBtn} onInvalid={this._disableBtn}>
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

          <Allergens 
            mode="edit" 
            allergens={ editedItem ? editedItem.allergens : undefined /* if undefined then is using defaultProps */ }  
            onChange={this.onAllergensChange} />

          <h4 style={headerStyle}>Add to menu</h4>
          <hr />
          <AddToMenu
            editItemId={editItemId}
            onChange={this.onSectionsChange}
            menus={this.props.menus}
            sections={this.props.sections} />

          <div style={footerStyles}>
            <FlatButton label="Close" onClick={this.props.onHide} />
            <FlatButton label={ editedItem ? "Edit" : "Create" } primary={true} disabled={!this.state.canSubmit} type="submit" />
          </div>
        </Form>
      </Dialog>
      </div>
    );
  }
}
