const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require('../root/upload');


const {
  createClub,
  getClubs,
} = require('../controllers/clubsControllers');

router.post('/', upload.single('club_logo'), createClub);
router.get('/', getClubs);

module.exports = router;
