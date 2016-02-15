import Model from './Model';

export default class Section extends Model {
  constructor(section) {
    super(section);
    this.type = 'Section';
    this.category = section.category;
  }
}
