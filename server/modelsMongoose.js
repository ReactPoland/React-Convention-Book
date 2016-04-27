import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// const conf = {
//   hostname: process.env.MONGO_HOSTNAME || 'localhost',
//   port: process.env.MONGO_PORT || 27017,
//   env: process.env.MONGO_ENV || 'test',
// };

const conf = {
  hostname: process.env.MONGO_HOSTNAME || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'test',
};

// test / test123
//
let dbUser
if(process.env.MONGO_USER && process.env.MONGO_PASS) {
  dbUser = {user: process.env.MONGO_USER, pass: process.env.MONGO_PASS}
} else {
  dbUser = undefined; // on local dev not required
}
// ds011890.mlab.com:11890/rrtest

mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`, dbUser);

var menuItemSchema = {
  title: { type: String, required: true, default: 'mongoosedefault' },
  description: String,
  description2: String,
  description3: String,
  picUrl: { type: String, required: true, default: 'http://lorempixel.com/700/500/food/' },
  type: String,
  allergens: Object,
  ownedByRestaurantID: String
};
var MenuItemCollection = mongoose.model('MenuItemCollection', menuItemSchema, 'menuItems');

var emailTemplateSchema = {
  templateText: String,
  templateName: String,
  ownedByRestaurantID: String
};
var EmailTemplateCollection = mongoose.model('EmailTemplateCollection', emailTemplateSchema, 'emailTemplates');

var restaurantSchema = {
  name: String,
  subdomain: String,
  siteName: String,
  siteDescription: String,
  RRAccountManager: String,
  positions: String,
  clientName: String,
  clientAddress: String,
  clientPhoneNumber: String,
  availableFeatures: String
};
var RestaurantCollection = mongoose.model('RestaurantCollection', restaurantSchema, 'restaurants');

var sectionSchema = {
  title: { type: String, required: true, default: 'mongoosedefault' },
  category: { type: String, required: true, default: 'mongoosedefault' },
  items: Array,
  ownedByRestaurantID: String
};
var SectionCollection = mongoose.model('SectionCollection', sectionSchema, 'sections');

var menuSchema = {
  title: { type: String, required: true, default: 'mongoosedefault' },
  description: { type: String, required: true, default: 'mongoosedefault' },
  showAllergensInMenu: { type: Boolean, required: true, default: true },
  orderNumber: Number,
  sectionsById: Array,
  ownedByRestaurantID: String
};

var MenuCollection = mongoose.model('MenuCollection', menuSchema, 'menus');

// create a schema
var userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  ownedByRestaurantID: String,
  active: { type: Boolean, required: true, default: true },
  verified: Boolean,
  imageUrl: { type: String, required: true, default: 'http://lorempixel.com/100/100/people/' },
  gender: String,
  created_at: Date,
  updated_at: Date,
  address: { type: String, required: true, default: 'default address' },
  position: { type: String, required: true, default: 'mongoosedefault'},
  location: { type: String, required: true, default: 'mongoosedefault'},
  phoneNumber: String
});


// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude';

  return this.name;
};


// the schema is useless so far
// we need to create a model using it
var UserCollection = mongoose.model('User', userSchema, 'users');


module.exports = {
  MenuCollection,
  MenuItemCollection,
  SectionCollection,
  UserCollection,
  RestaurantCollection,
  EmailTemplateCollection
};
