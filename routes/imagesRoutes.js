const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require('../root/upload');


const {
  uploadImg,
  getImages,
  getFoldersName,
} = require('../controllers/imgsControllers');

router.post('/', upload.array('image'), uploadImg);
router.get('/', getImages);
router.get('/folders', getFoldersName);

module.exports = router;
