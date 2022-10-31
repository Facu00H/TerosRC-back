/* eslint-disable max-len */
const Club = require('../models/clubes');
const GameScore = require('../models/GameScores');

const scoreController = {
  createScore: async (req, res) => {
    const {localTeam, guestTeam, date} = req.body;
    Date(date);
    const local = await Club.findById({_id: localTeam});
    const visit = await Club.findById({_id: guestTeam});
    if (local._id === visit._id) {
      res.status(400).json({
        message: 'localTeam and guestTeam will be different',
        success: false,
      });
    } else {
      try {
        const scoreGame = await new GameScore(req.body, Date(date)).save();
        res.status(200).json({
          message: 'scoreGame created',
          response: scoreGame,
          success: true,
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getScore: async (req, res) => {
    const gamesScores = await GameScore.find().populate('localTeam guestTeam');
    if (gamesScores) {
      try {
        res.status(200).json({
          message: 'get all results',
          response: gamesScores,
          success: true,
        });
      } catch (err) {
        res.status(400).json({
          message: 'something was wrong',
          response: err,
          success: false,
        });
      }
    } else {
      res.status(404).json({
        message: 'results not found',
        success: false,
      });
    }
  },
};

module.exports = scoreController;
