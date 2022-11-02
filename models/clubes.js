const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Club = new Schema({
  name: {type: String, required: true},
  img: {type: Object, required: true},
});

module.exports = mongoose.model('Club', Club);
