import Model from './Model';

const $ref = require('falcor').Model.ref;
const $atom = require('falcor').Model.atom;

export default class Menu extends Model {
  constructor(menu) {
    super(menu);
    this.type = 'Menu';
    this.showAllergensInMenu = typeof(menu.showAllergensInMenu) !== 'undefined' ? menu.showAllergensInMenu : true;
    this.sections = super.prepareArray(menu.sections);
  }

  formatForWire() {
    const forWire = super.formatForWire();

    forWire.sections = super.makeRefs(this.sections, 'sectionsById');
    forWire.showAllergensInMenu = this.showAllergensInMenu;
    return forWire;
  }
}
