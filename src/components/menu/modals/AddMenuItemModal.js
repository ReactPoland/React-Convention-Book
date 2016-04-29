import React from 'react';
import {
  Dialog,
  FlatButton
} from 'material-ui';
import WarningIcon from 'material-ui/lib/svg-icons/alert/warning';
import { Form } from 'formsy-react';

import { MenuItem, Allergen } from 'models';

import Allergens from 'components/menu/Allergens';
import AddToMenu from 'components/menu/AddToMenu';
import { DefaultInput } from 'components/forms/DefaultInput';
import { DefaultDatePicker } from 'components/forms/DefaultDatePicker';
import CloseClearModalIcon from 'react-material-icons/icons/content/clear';

import RichEditor from 'components/wyswig-draftjs/RichEditor';
import { allergensDetails } from 'components/menu/Allergens';
import UploadComponent from 'components/menu/modals/uploadAWS/UploadComponent';

import falcorModel from '../../../falcorModel.js';

const d = new Date();
const today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

const STOCK_IMAGE = 'https://placeholdit.imgix.net/~text?txtsize=24&txt=No+Image+Selected&w=200&h=200&txttrack=0';

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
    this._onchangeDraftJSON = this._onchangeDraftJSON.bind(this);
    this._onchangeDraftJSON2 = this._onchangeDraftJSON2.bind(this);
    this._onchangeDraftJSON3 = this._onchangeDraftJSON3.bind(this);


    this.onImgChange = this.onImgChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      canSubmit: false,
      contentJSON: {},
      allergens: {}
    };

    if(!props.editItemId) {
      // set default allergens obj based on Allergens component config:
      allergensDetails.map((allergenItem) => {
        this.state.allergens[allergenItem.value] = false;
      });

    }
  }

  componentWillMount() {
      if(this.props.editItemId && this.state.canSubmit === false) {
        let editedItem = this.props.menuItems.get(this.props.editItemId);
        this._enableBtn();
        // TODO - refactor delete setState somewhere else
        this.setState({
          editedItem: editedItem,
          allergens: editedItem.allergens,
          contentJSON: {
            description: editedItem.description,
            description2: editedItem.description2,
            description3: editedItem.description3
          }
        });
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

  uploadFile = async (payload) => {
    this.setState({
      uploadingImage: true,
      uploadError: null
    });

    let upload = falcorModel
    .call(['menuItem', 'uploadPicture'], payload)
    .then((result) => {
      this.setState({
        uploadingFile: false,
        uploadError: result === false ? 'Upload error, please try again' : null
      });

      return payload[0];
    });

    return upload;
  }

  _onDone = async (formData) => {
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

    formData.description = this.state.contentJSON["description"] || "";

    formData.description2 = this.state.contentJSON["description2"] || '';

    formData.description3 = this.state.contentJSON["description3"] || '';

    if(this.props.editItemId) formData.id = this.props.editItemId;

    if(this.state.uploadImagePayload) {
      let uploadedImage = await this.uploadFile(this.state.uploadImagePayload);
      formData.picUrl = uploadedImage;
    } else {
      let item = this.props.menuItems.get(this.props.editItemId);
      formData.picUrl = (item ? item.picUrl : null) || STOCK_IMAGE;
    }

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

  _onchangeDraftJSON(contentJSON, descriptionName) {
    let newContentJSON = this.state.contentJSON;
    newContentJSON[descriptionName] = contentJSON;
    this.setState({ contentJSON: newContentJSON});
  }

  _onchangeDraftJSON2(contentJSON, descriptionName) {
    let newContentJSON = this.state.contentJSON;
    newContentJSON[descriptionName] = contentJSON;
    this.setState({ contentJSON: newContentJSON});
  }

  _onchangeDraftJSON3(contentJSON, descriptionName) {
    let newContentJSON = this.state.contentJSON;
    newContentJSON[descriptionName] = contentJSON;
    this.setState({ contentJSON: newContentJSON});
  }

  onImgChange(imagePayload) {
    this.setState({
      uploadImagePayload: imagePayload,
      _canSubmit: true
    });
  }

  render() {
    let editItemId = this.props.editItemId;
    let editedItem;
    if(editItemId) {
      editedItem = this.props.menuItems.get(editItemId);
    }

    let richEditor1Value = '';
    let richEditor2Value = '';
    let richEditor3Value = '';

    if(editedItem && editedItem.description) {
      richEditor1Value = editedItem.description;
    }

    if(editedItem && editedItem.description2) {
      richEditor2Value = editedItem.description2;
    }

    if(editedItem && editedItem.description3) {
      richEditor3Value = editedItem.description3;
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
              tabIndexProp="100000"
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

          <RichEditor
            tabIndexProp="100003"
            initialValue={ richEditor1Value }
            name="description"
            title="Description (Level 1)"
            onChangeTextJSON={this._onchangeDraftJSON} />

          <RichEditor
            tabIndexProp="100005"
            initialValue={ richEditor2Value }
            name="description2"
            title="Description (Level 2)"
            onChangeTextJSON={this._onchangeDraftJSON2} />

          <RichEditor
            tabIndexProp="100006"
            initialValue={ richEditor3Value }
            name="description3"
            title="Description (Level 3)"
            onChangeTextJSON={this._onchangeDraftJSON3} />
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
          <h4 style={headerStyle}>UPLOAD IMAGE</h4>
          <UploadComponent
            itemId={editItemId}
            imgUrl={editedItem ? editedItem.picUrl : STOCK_IMAGE}
            onImgChange={this.onImgChange}
          />
          <div className="col-md-12">
            <FlatButton
              disabled={true}
              disabledBackgroundColor={'#fff'}
              disabledLabelColor={'#000'}
              icon={<WarningIcon />}
              label={'Image preview only! Remember to submit the changes.'}
            />
          </div>

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
