const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Images = new Schema({
  folder: {type: String, required: true},
  urlList: [{type: Object, required: true}],
});

module.exports = mongoose.model('Images', Images);
