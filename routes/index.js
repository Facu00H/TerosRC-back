var express = require('express');
const clubs = require('../routes/clubsRoutes')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TerosRc' });
});

router.use('/clubs', clubs)

module.exports = router;
