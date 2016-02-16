import Model from './Model';

export default class MenuSection extends Model {
  constructor(section) {
    super(section);

    this.type = 'MenuSection';
    this.items = (section.items || []).map((item) => item);
  }

  formatForWire() {
    const forWire = super.formatForWire();

    if(this.items && Array.isArray(this.items)) {
      forWire.sections = this.items.map(
        (item) => {
          if(item instanceof Model) {
            return item.formatForWire();
          }
        }
      );
    }

    return forWire;
  }
}
