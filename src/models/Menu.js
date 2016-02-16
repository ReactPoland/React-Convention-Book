import Model from './Model';
import MenuSection from './MenuSection';

export default class Menu extends Model {
  constructor(menu) {
    super(menu);

    this.type = 'Menu';
    this.sections = (menu.sections || []).map((section) => ({
      id: section.id,
      items: (section.items || []).map((item) => item)
    }));
  }

  formatForWire() {
    const forWire = super.formatForWire();

    if(this.sections) {
      if(Array.isArray(this.sections)) {
        forWire.sections = this.sections.map(
          (section) => ({
            id: section.id,
            items: (section.items || []).map((item) => item)
          })
        );
      }
    }

    return forWire;
  }
}
