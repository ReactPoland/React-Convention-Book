import Model from './Model';
import MenuSection from './MenuSection';

export default class Menu extends Model {
  constructor(menu) {
    super(menu);

    this.type = 'Menu';
    this.sections = (menu.sections || []).map((section) => {
      return new MenuSection(section);
    });
  }
}
