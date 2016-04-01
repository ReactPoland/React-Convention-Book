import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const conf = {
  hostname: process.env.MONGO_HOSTNAME || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'test',
};

mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`);

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

// create a schema
var userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  verified: false,
  imageUrl: String,
  gender: String,
  created_at: Date,
  updated_at: Date
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


// let andStatementQuery = {
//   $and: [
//       { 'username.type': 'rradmin' },
//       { 'password.type': '1' }
//   ]
// }

// // get the user rradmin
// UserCollection.find(andStatementQuery, function(err, user) {
//   if (err) throw err;

//   // object of the user
//   console.info("user");
//   console.info(user);
//   console.info("user");
// });

// get any admin that was created in the past month

// get the date 1 month ago
// var monthAgo = new Date();
// monthAgo.setMonth(monthAgo.getMonth() - 1);


// UserCollection.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, users) {
//   if (err) throw err;

//   // show the admins in the past month
//   console.log(users);
// });


module.exports = { 
  MenuCollection,
  MenuItemCollection,
  SectionCollection,
  UserCollection
};