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

    return (
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
            <CardTitle title={item.title}>
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
                  primaryText="Edit Item"
                  rightIcon={<EditorModeEdit />} />
                <MenuItem
                  primaryText="Remove Item"
                  rightIcon={<ActionDelete />} />
              </IconMenu>
            </CardTitle>
          </h4>
          <CardText>
            <Excerpt text={item.description} />
          </CardText>
        </div>
      </Card>
    );
  }
}
