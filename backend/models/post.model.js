const mongoose = require('mongoose');

/*
Schema.method('toClient', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});
*/

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  email: { type: String, required: true },
  publishDate: { type: Date, required: true },
  editDate: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

postSchema.method('toClient', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model('Post', postSchema);

