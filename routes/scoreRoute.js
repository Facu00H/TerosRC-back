const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {
  createScore,
  getScore,
} = require('../controllers/gameScoreController');

router.post('/', createScore);
router.get('/', getScore);

module.exports = router;
