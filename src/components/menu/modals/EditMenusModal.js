import React from 'react';
import ReactDOM from 'react-dom';
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
  Popover,
  Checkbox
} from 'material-ui'
import {
  EditorModeEdit,
  ActionDelete
} from 'material-ui/lib/svg-icons';
import Colors from 'material-ui/lib/styles/colors';
import { Form } from 'formsy-react';
import { Menu } from 'models';

import { DefaultInput } from 'components/forms/DefaultInput';

var unmountTextFieldHandler = null;

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
    this._onChangeEditTitleInput = this._onChangeEditTitleInput.bind(this);

    this.state = {
      menuInEdit: null,
      showAllergensInEditMenu: null
    };
  }

  _unlockInput(menu) {
    this.setState({
      menuInEdit: menu.id,
      changedEditTitleValue: menu.title
    });
  }

  _lockInputAndSave(menuTitleDefault) {
    let title = this.refs[this.state.menuInEdit].getValue();
    if(title === undefined) { 
      // we need to do it, because maybe a checkbox has been changed
      title = menuTitleDefault;
    }

    let originMenu = this.props.menus.get(this.state.menuInEdit);
    originMenu.showAllergensInMenu = this.state.showAllergensInEditMenu;

    const newMenu = new Menu(originMenu.formatForWire());
    newMenu.title = title;

    this.props.onUpdate(newMenu);
    this.setState({
      menuInEdit: null,
      showAllergensInEditMenu: null
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

  _onChangeEditTitleInput(e) {
    this.setState({
      changedEditTitleValue: e.target.value
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

        let editShowAllergens = (<Checkbox
            defaultChecked={this.state.showAllergensInEditMenu}
            name="checkboxEditShowAllergensInMenu"
            label={<span>Don't show allergen guide</span>}
            onCheck={() => { this.setState({ showAllergensInEditMenu: !this.state.showAllergensInEditMenu}) }} />);

        nameNodeEdit = (
          <Form>
              <DefaultInput
                value={ this.state.changedEditTitleValue ? this.state.changedEditTitleValue : menu.title}
                name={menu.title}
                ref={menu.id}
                autoFocus
                required
                onChange={this._onChangeEditTitleInput}
                onEnterKeyDown={this._lockInputAndSave.bind(this, menu.title)} />
                {editShowAllergens}
                <FlatButton 
                  primary={true} 
                  label="Save changes" 
                  onTouchTap={this._lockInputAndSave.bind(this, menu.title)} />

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

        <div style={{height: 60+(topPadding===0 ? 30 : 0)}}>
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
