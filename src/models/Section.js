import Model from './Model';

export default class Section extends Model {
  constructor(section) {
    super(section);
    this.type = 'Section';
    this.category = section.category;

    if(Array.isArray(section.items)) {
      this.items = section.items.map((item) => item)
    } else {
      const keys = section.items ? Object.keys(section.items) : [];
      keys.splice(keys.indexOf('$__path'), 1);
      this.items = keys.map((key) => section.items[key].id);
    }
  }

  formatForWire() {
    const forWire = super.formatForWire();
    forWire.items = this.items.map((item) => item);
    return forWire;
  }
}
