import React from 'react';
import {
  Dialog,
  FlatButton,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  IconButton,
  Popover
} from 'material-ui'
import {
  EditorModeEdit,
  ActionDelete
} from 'material-ui/lib/svg-icons';
import Colors from 'material-ui/lib/styles/colors';
import { Form } from 'formsy-react';
import { Menu } from 'models';

import { DefaultInput } from 'components/forms/DefaultInput';

export default class EditMenusModal extends React.Component {
  static defaultProps = {
    onUpdate: () => {},
    onDelete: () => {},
    onHide: () => {},
    menus: new Map()
  }

  constructor(props) {
    super(props);

    this._unlockInput         = this._unlockInput.bind(this);
    this._lockInputAndSave    = this._lockInputAndSave.bind(this);
    this._openDeletePopup     = this._openDeletePopup.bind(this);
    this._closeDeletePopup    = this._closeDeletePopup.bind(this);
    this._onDelete            = this._onDelete.bind(this);

    this.state = {
      menuInEdit: null
    };
  }

  _unlockInput(menu) {
    this.setState({
      menuInEdit: menu.id
    });
  }

  _lockInputAndSave() {
    const title = this.refs[this.state.menuInEdit].getValue();
    if(title === undefined) { 
      this.setState({
        menuInEdit: null
      });
      return;
    }

    const originMenu = this.props.menus.get(this.state.menuInEdit);
    const newMenu = new Menu(originMenu.formatForWire());
    newMenu.title = title;

    this.props.onUpdate(newMenu);
    this.setState({
      menuInEdit: null
    });
  }

  _openDeletePopup(menuId, e) {
    this.setState({
      menuToDelete: menuId,
      popupAnchor: e.currentTarget
    });
  }

  _closeDeletePopup() {
    this.setState({
      menuToDelete: null,
      popupAnchor: null
    });
  }

  _onDelete() {
    this.props.onDelete(this.state.menuToDelete);
    this.setState({
      menuToDelete: null,
      popupAnchor: null
    });
  }

  render() {
    const actionBtns = (
      <FlatButton primary={true} label="Done" onTouchTap={this.props.onHide} />
    );
    let nameNodeEdit = null;
    let topPadding = 30;
    const rows = [];
    this.props.menus.forEach((menu, index) => {
      const { menuInEdit } = this.state;
      let nameNode = menu.title;


      if(menuInEdit === menu.id) {
        topPadding = 0;
        nameNodeEdit = (
          <Form>
            <div>
              <DefaultInput
                defaultValue={menu.title}
                name={menu.id}
                ref={menu.id}
                autoFocus
                required
                onEnterKeyDown={this._lockInputAndSave} />
            </div>
          </Form>
        );
        nameNode = <span style={{color: 'red', topPadding: 10}}>{menu.title} [editing - ENTER to submit changes] </span>;
      }

      rows.push(
        <TableRow key={menu.id}>
          <TableRowColumn>{nameNode}</TableRowColumn>
          <TableRowColumn className="TableColumn--actions">
            <IconButton onClick={this._unlockInput.bind(this, menu)}>
              <EditorModeEdit color={Colors.minBlack} />
            </IconButton>
            <IconButton onClick={this._openDeletePopup.bind(this, menu.id)}>
              <ActionDelete color={Colors.minBlack} />
            </IconButton>
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Dialog
        open={this.props.open}
        title="Edit menus"
        actions={actionBtns}>

        <div style={{height: 30}}>
          {nameNodeEdit}
        </div>
        <Table fixedHeader height="50vh" style={{topPadding: topPadding}}>
          <TableHeader>
            <TableRow className="TableRow--no_checkbox">
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn className="TableColumn--actions">Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            selectable={false}>

            {rows}

          </TableBody>
        </Table>

        <Popover
          open={!!this.state.menuToDelete}
          anchorEl={this.state.popupAnchor}
          anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
          targetOrigin={{horizontal: 'middle', vertical: 'center'}}
          onRequestClose={this._closeDeletePopup}>
          <FlatButton label="Cancel" onClick={this._closeDeletePopup} />
          <FlatButton label="Delete" onClick={this._onDelete} primary={true} />
        </Popover>

      </Dialog>
    );
  }
}
