const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const UserSchema = new Schema({
  name: {type: String, min: 2, max: 225, required: true},
  lastName: {type: String, min: 2, max: 225, required: true},
  email: {type: String, required: true},
  phone: {type: Number, required: true},
  role: {type: String, required: true},
  verified: {type: Boolean, required: true},
  token: {type: String},
  uniqueStringUser: {type: String, required: true},
});

const User = mongoose.model('User', UserSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(225).required(),
    lastName: Joi.string().min(2).max(225).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().phone().required(),
    uniqueStringUser: Joi.string().min(2).max(225).required(),
  });
  return schema.validate(user);
};

module.exports = {
  User,
  validate,
};
