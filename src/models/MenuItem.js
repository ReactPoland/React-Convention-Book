import Model from './Model';

export default class MenuItem extends Model {
  constructor(item) {
    super(item);

    this.type = 'MenuItem';
    this.picUrl = item.picUrl;
  }

  formatForWire() {
    const forWire = super.formatForWire();

    forWire.picUrl = this.picUrl;

    return forWire;
  }
}
