const $ref = require('falcor').Model.ref;
const $atom = require('falcor').Model.atom;

export default class Model {
  constructor(model) {
    if(model.id)          this.id = model.id;
    if(model.createdAt)   this.createdAt = new Date(model.createdAt);
    if(model.updatedAt)   this.updatedAt = new Date(model.updatedAt);
    if(model.title)       this.title = model.title;
    if(model.description) this.description = model.description;
  }

  formatForWire() {
    const forWire = {};

    if(this.id) forWire.id = this.id;
    if(this.title) forWire.title = this.title;
    if(this.description) forWire.description = this.description;
    return forWire;
  }

  prepareArray(items) {
    // if menu sections is array it can be either:
    // array of ids as strings
    // or array of falcor $refs
    if(Array.isArray(items)) {
      return items.map((item) => {
        if(typeof item === 'string') {
          return item;
        } else {
          return item.value[1];
        }
      });
    } else {
      const keys = items ? Object.keys(items) : [];
      const pathIndex = keys.indexOf('$__path');

      if(pathIndex !== -1) {
        keys.splice(pathIndex, 1);
      }

      // same as above,
      // handle 'regular' objects
      // and falcor $refs
      return keys.map((key) => {
        if(items[key].$type) {
          return items[key].value[1];
        } else {
          return items[key].id;
        }
      });
    }
  }

  makeRefs(items, refTo) {
    if(Array.isArray(items)) {
      return items.map((id) => {
        return $ref([refTo, id]);
      });
    } else {
      return [];
    }
  }
}
