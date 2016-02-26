import Model from './Model';

export default class Section extends Model {
  constructor(section) {
    super(section);
    this.type = 'Section';
    this.category = section.category;

    this.items = super.prepareArray(section.items);
  }

  formatForWire() {
    const forWire = super.formatForWire();

    forWire.items = super.makeRefs(this.items, 'menusById');

    return forWire;
  }
}
