import Model from './Model';

export default class Menu extends Model {
  constructor(menu) {
    super(menu);

    this.type = 'Menu';
    // this.sections = (menu.sections || []).map((section) => ({
    //   id: section.id,
    //   items: (section.items || []).map((item) => item)
    // }));
    if(Array.isArray(menu.sections)) {
      this.sections = menu.sections.map((item) => item)
    } else {
      const keys = Object.keys(menu.sections || {});
      keys.splice(keys.indexOf('$__path'), 1);
      this.sections = keys.map((key) => menu.sections[key].id);
    }
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
