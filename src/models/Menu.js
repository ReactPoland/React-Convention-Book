import Model from './Model';

const $ref = require('falcor').Model.ref;

export default class Menu extends Model {
  constructor(menu) {
    super(menu);

    this.type = 'Menu';

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
          (section) => {
            if(typeof section === 'string') {
              return section;
            } else {
              return {
                id: section.id,
                items: (section.items || []).map((item) => item)
              }
            }
          }
        );
      }
    }

    return forWire;
  }

  getKeysAndValues() {
    const sections = this.sections.map((section) => {
      return $ref(['sectionsById', section.id]);
    });

    return [
      ['id',      'title',      'description'/*,      'sections'*/],
      [[this.id], [this.title], [this.description]/*, [sections]*/]
    ];
  }
}
