/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');

const userControllers = {

  createUser: async (req, res) => {
    const {name, email, password, phone, lastName} = req.body;
    try {
      const user = await User.findOne({email: email});
      const uniqueString = crypto.randomBytes(15).toString('hex');
      if (user) {
        res.status(400).json({
          message: 'Ya hay una cuenta creada con este correo',
          success: false,
        });
      } else {
        const encryptedPassword = await bcrypt.hashSync(password, 10);
        const role = 'admin';
        const newUser = await new User({
          name: name,
          lastName: lastName,
          email: email,
          password: encryptedPassword,
          role: role,
          phone: phone,
          uniqueStringUser: uniqueString,
          verified: false,
        });
        await sendEmail(email, uniqueString);
        const token = await jwt.sign({id: newUser._id}, process.env.KEY_JWT, {
          expiresIn: '1d',
        });
        newUser.token = token;
        newUser.save();
        res.status(201).json({
          data: newUser,
          token: token,
        });
      };
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: req.body,
        success: false,
      });
    };
  },

  verifyMail: async (req, res) => {
    const {uniqueString} = req.params;
    const user = await User.findOne({uniqueStringUser: uniqueString});

    if (!user) {
      res.status(400).json({
        message: 'User not found',
        success: false,
      });
    } else {
      user.verified = true;
      user.save();

      res.status(200).json({
        messagge: 'email verified',
        success: true,
      });
    }
  },

};

module.exports = userControllers;
