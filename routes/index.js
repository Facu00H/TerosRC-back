const express = require('express');
const clubs = require('../routes/clubsRoutes');
const score = require('../routes/scoreRoute');
// eslint-disable-next-line new-cap
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'TerosRc'});
});

router.use('/clubs', clubs);
router.use('/score', score);

module.exports = router;
