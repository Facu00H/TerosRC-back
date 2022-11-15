const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {
  createUser,
  verifyMail,
} = require('../controllers/userControllers');

router.post('/', createUser);
router.get('/:uniqueString', verifyMail);

module.exports = router;
