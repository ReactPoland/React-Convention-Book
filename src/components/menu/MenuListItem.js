import React from 'react';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions,
  IconMenu,
  IconButton,
  MenuItem,
  RaisedButton,
  Dialog,
  FlatButton,
  Popover
} from 'material-ui';
import {
  ActionSettings,
  ActionZoomIn,
  NavigationClose,
  EditorModeEdit,
  ActionDelete
} from 'material-ui/lib/svg-icons';
import Colors from 'material-ui/lib/styles/colors';

import DraftExcerpt from 'components/DraftExcerpt';
import Allergens from 'components/menu/Allergens';
import { _computeBelongingsMapUtil, _createBelongingsStringUtil } from 'utils/_computeItemMenuBelongingsUtils';

const mediaStyles = {
  witdh: 200,
  height: 200,
  maxWidth: 200
};

const menuStyle = {
  float: 'right',
  marginTop: -44,
  marginRight: -8
};

// mock below
window.amazonURL = "https://restauranttestbucket.s3-us-west-2.amazonaws.com/";



export default class MenuListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgOpen: false,
      open: false,
    };

    this._handleOpenImg = this._handleOpenImg.bind(this);
    this._handleCloseImg = this._handleCloseImg.bind(this);
    this.deleteOrRemoveActionModal = this.deleteOrRemoveActionModal.bind(this);
    this.onDeleteWithModal = this.onDeleteWithModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  _handleOpenImg(event) {
    this.setState({
      imgOpen: true,
      imgAnchor: event.currentTarget
    });
  }

  _handleCloseImg() {
    this.setState({
      imgOpen: false,
      imgAnchor: null
    });
  }

  deleteOrRemoveActionModal() {
    // alert("deleteOrRemoveActionModal");
    if(this.props.currentSectionId) {
      this.props.onDeleteClick(this.props.item.id, this.props.currentSectionId);
    } else {
      this.setState({open: true});
    }
    //
  }

  onDeleteWithModal() {
    this.props.onDeleteClick(this.props.item.id, this.props.currentSectionId);
    this.setState({open: false});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onDeleteWithModal}
      />,
    ];

    const { item } = this.props;
    if(typeof item.description === "string") {
      try {
        item.description = JSON.parse(item.description);
      } catch (e) {
        console.warn("error: "+e);
      }
    }

    if(typeof item.description2 === "string") {
      try {
        item.description2 = JSON.parse(item.description2);
      } catch (e) {
        console.warn("error: "+e);
      }
    }

    if(typeof item.description3 === "string") {
      try {
        item.description3 = JSON.parse(item.description3);
      } catch (e) {
        console.warn("error: "+e);
      }
    }

    let computedBelongingsMap = _computeBelongingsMapUtil(this.props.item.id, this.props.sections, this.props.menus);
    let belongingsString = _createBelongingsStringUtil(computedBelongingsMap, this.props.sections, this.props.menus);

    let itemBelongingsJSX = [];
    if(belongingsString) {
      for(let key in belongingsString) {
        let arrayOfSections = belongingsString[key];
        arrayOfSections.map((item, index) => {
          itemBelongingsJSX.push(
            <span key={item+index} >
              <span style={{color: '#ff0000'}}> {key}</span> <span style={{color: '#56A76F'}}>: {item}</span>
            </span>);
        })
      }
    } else itemBelongingsJSX = null;

    let AllergensJSX = (
      <Allergens
        readOnly={true}
        allergensObj={item.allergens}/>);

    return (
      <Card className="MenuItem">
        <div>
          <Dialog
            title="Are you sure?"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}>
            Are you sure that you want to delete this item permamently from the library?
          </Dialog>
        </div>
        <div className="MenuItem-Left">
          <CardMedia style={mediaStyles}>
            <div
              className="MenuItem-Thumbnail"
              onClick={this._handleOpenImg}
              style={{backgroundImage: 'url("' + window.amazonURL+item.picUrl + '")'}} />
            <ActionZoomIn className="MenuItem-Zoom" color="#fff" />
          </CardMedia>
          <Popover
            className="MenuItem-Preview"
            open={this.state.imgOpen}
            anchorEl={this.state.imgAnchor}
            onRequestClose={this._handleCloseImg}
            canAutoPosition
            zDepth={3}
            anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
            targetOrigin={{horizontal: 'middle', vertical: 'center'}}>

            <img className="MenuItem-Preview--image" src={window.amazonURL+item.picUrl} onClick={this._handleCloseImg} alt="thumbnail" />
            <NavigationClose className="MenuItem-Preview--close" onClick={this._handleCloseImg} color="#fff" />
          </Popover>
        </div>
        <div className="MenuItem-Right">
          <h4>
            <CardTitle title={item.title} style={{padding: 0, paddingLeft: 15, lineHeight: 6}}>
              {
                localStorage.role === 'admin' ?
                  <IconMenu
                    style={menuStyle}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    targetOrigin={{vertical: 'top', horizontal: 'right'}}
                    iconButtonElement={
                      <IconButton>
                        <ActionSettings color={Colors.grey400} />
                      </IconButton>
                    }>
                    <MenuItem
                      onClick={() => this.props.onEditClick(this.props.item.id)}
                      primaryText="Edit Item"
                      rightIcon={<EditorModeEdit />} />
                    <MenuItem
                      onClick={this.deleteOrRemoveActionModal}
                      primaryText={ !this.props.currentSectionId ? "Delete Item" : "Remove Item" }
                      rightIcon={<ActionDelete />} />
                  </IconMenu>
                : null }
            </CardTitle>

            <span style={{paddingLeft: 20, fontSize: 10}}>
              { this.props.currentSectionId ? null : itemBelongingsJSX}
            </span>
            {AllergensJSX}
          </h4>
          <CardText style={{padding: 3, paddingLeft: 20}}>
            <DraftExcerpt descriptionOne={item.description} descriptionTwo={item.description2} descriptionThree={item.description3} />
          </CardText>
        </div>
      </Card>
    );
  }
}
