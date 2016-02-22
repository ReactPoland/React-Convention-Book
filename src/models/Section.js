import Model from './Model';

export default class Section extends Model {
  constructor(section) {
    super(section);
    this.type = 'Section';
    this.category = section.category;
    this.items = (section.items || []).map((item) => item);
  }

  formatForWire() {
    const forWire = super.formatForWire();
    forWire.items = this.items.map((item) => item);
    return forWire;
  }
}
