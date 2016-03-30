import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test');

var menuItemSchema = {
  title: String,
  description: String,
  type: String,
  description2: String,
  description3: String,
  allergens: Array
};
var MenuItemCollection = mongoose.model('MenuItemCollection', menuItemSchema, 'menuItems');



var sectionSchema = {
  title: String,
  category: String,
  items: Array
};
var SectionCollection = mongoose.model('SectionCollection', sectionSchema, 'sections');


var menuSchema = {
  title: String,
  description: String,
  orderNumber: Number,
  sectionsById: Array
};
var MenuCollection = mongoose.model('MenuCollection', menuSchema, 'menus');



module.exports = { 
  MenuCollection,
  MenuItemCollection,
  SectionCollection
};