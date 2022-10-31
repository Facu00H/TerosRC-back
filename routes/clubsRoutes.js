const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {
  createClub,
  getClubs,
} = require('../controllers/clubsControllers');

router.post('/', createClub);
router.get('/', getClubs);

module.exports = router;
