const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameScore = new Schema({
  localTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  localScore: {type: Number, required: true},
  guestTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  guestScore: {type: Number, required: true},
  date: {type: Date, required: true},
});

module.exports = mongoose.model('GameScore', GameScore);
