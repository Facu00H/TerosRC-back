const Club = require('../models/clubes') 

const clubController = {
  createClub: async (req, res) => {
    const { name }  = req.body

    let club = await Club.findOne({name: name});

    if(club){
      return res.status(400).json({
        message: 'Club already exists',
        success: false
      })
    }else{
      try{
        club = await new Club(req.body).save();
        return res.status(201).json({
          message: 'Club created',
          response: club,
          success: true,
          clubID: club._id
        })
      }catch(err){
        res.status(400).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getClubs: async (req, res) => {
    const clubs = await Club.find()
    if(clubs.length > 0) {
      try{
        return res.status(201).json({
          response: clubs,
          success: true,
        })
      }catch(err){
        console.log(err)
        return res.status(400).json({
          message: err,
          success: false,
        });
      }
    }else{
      return res.status(400).json({
        message: 'can\'t find clubs',
        success: false,
      });
    }
    
  }
}

module.exports = clubController