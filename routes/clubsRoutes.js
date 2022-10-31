const express = require('express');
const router = express.Router();

const {
  createClub,
  getClubs
} = require('../controllers/clubsControllers');

router.post("/", createClub);
router.get("/", getClubs);

module.exports = router;