const Club = require('../models/clubes');

const clubController = {
  createClub: async (req, res) => {
    const {name} = req.body;
    let club = await Club.findOne({name: name});

    if (club) {
      return res.status(400).json({
        message: 'Club already exists',
        success: false,
      });
    } else {
      try {
        club = await new Club({name: name, img: req.file}).save();
        return res.status(201).json({
          message: 'Club created',
          response: club,
          success: true,
          clubID: club._id,
        });
      } catch (err) {
        res.status(400).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getClubs: async (req, res) => {
    const {page = 1, limit = 5} = req.query;
    const clubs = await Club.find();
    // .limit(limit * 1)
    // .skip((page - 1) * limit)
    // .exec();
    const count = await Club.countDocuments();
    if (clubs.length > 0) {
      try {
        return res.status(201).json({
          response: clubs,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          success: true,
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          message: err,
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        message: 'can\'t find clubs',
        success: false,
      });
    };
  },
};

module.exports = clubController;
