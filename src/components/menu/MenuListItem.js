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

import Excerpt from 'components/Excerpt';
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

export default class MenuListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgOpen: false
    };

    this._handleOpenImg = this._handleOpenImg.bind(this);
    this._handleCloseImg = this._handleCloseImg.bind(this);
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

  render() {
    const { item } = this.props;

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
        allergensObj={item.allergens}/>)

    let returnJSXtemp = (
      <Card className="MenuItem">
        <div className="MenuItem-Left">
          <CardMedia style={mediaStyles}>
            <div
              className="MenuItem-Thumbnail"
              onClick={this._handleOpenImg}
              style={{backgroundImage: 'url("' + item.picUrl + '")'}} />
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

            <img className="MenuItem-Preview--image" src={item.picUrl} onClick={this._handleCloseImg} alt="thumbnail" />
            <NavigationClose className="MenuItem-Preview--close" onClick={this._handleCloseImg} color="#fff" />
          </Popover>
        </div>
        <div className="MenuItem-Right">
          <h4>
            <CardTitle title={item.title} style={{padding: 0, paddingLeft: 15, lineHeight: 6}}>
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
                  onClick={() => this.props.onDeleteClick(this.props.item.id)}
                  primaryText={ this.props.isFromLibraryDelete ? "Delete Item" : "Remove Item" }
                  rightIcon={<ActionDelete />} />
              </IconMenu>
            </CardTitle>

            <span style={{paddingLeft: 20, fontSize: 10}}>
              {itemBelongingsJSX}
            </span>
            {AllergensJSX}
          </h4>
          <CardText style={{padding: 3, paddingLeft: 20}}>
            <Excerpt text={item.description} />
          </CardText>
        </div>
      </Card>
    );

    return returnJSXtemp;
  }
}
