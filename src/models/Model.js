export default class Model {
  constructor(model) {
    if(model.id)          this.id = model.id;
    if(model.createdAt)   this.createdAt = new Date(model.createdAt);
    if(model.updatedAt)   this.updatedAt = new Date(model.updatedAt);
    if(model.title)       this.title = model.title;
    if(model.description) this.description = model.description;
  }
}
