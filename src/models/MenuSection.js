import Model from './Model';

export default class MenuSection extends Model {
  constructor(section) {
    super(section);

    this.type = 'MenuSection';
    this.items = (section.items || []).map((item) => item);
  }
}
