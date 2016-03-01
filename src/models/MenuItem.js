import Model from './Model';
import Allergen from './Allergen';

export default class MenuItem extends Model {
  constructor(item) {
    super(item);

    this.type = 'MenuItem';
    this.picUrl = item.picUrl;
    this.description = item.description;
    this.description2 = item.description2;
    this.description3 = item.description3;
    this.allergens = new Allergen(item.allergens);
  }

  formatForWire() {
    const forWire = super.formatForWire();

    forWire.picUrl = this.picUrl;
    forWire.description = this.description;
    forWire.description2 = this.description2;
    forWire.description3 = this.description3;
    forWire.allergens = this.allergens.formatForWire();

    return forWire;
  }
}
