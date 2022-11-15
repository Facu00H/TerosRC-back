const cloudinary = require('../root/cloudinary');
const fs = require('fs');
const Images = require('../models/images');


const imgUploader = {
  uploadImg: async (req, res) => {
    // eslint-disable-next-line max-len
    const uploader = async (path, fileNam) => await cloudinary.uploads(path, fileNam);
    const files = req.files;
    const folderNam = req.body.folderNam;
    const folder = await Images.findOne({folder: folderNam});
    try {
      const urls = [];
      for (const file of files) {
        const {path} = file;
        const newPath = await uploader(path, folderNam);
        urls.push(newPath);
        fs.unlinkSync(path);
        console.log(newPath);
      };
      if (!folder) {
        const newFolder = await new Images({
          folder: folderNam,
          urlList: urls,
        });
        newFolder.save();
      };
      res.status(200).json({
        message: 'Images uploads successfully',
        data: urls,
        succes: true,
      });
    } catch (e) {
      res.status(400).json({
        message: 'Images uploads failed',
        error: e,
        success: false,
      });
    }
  },

  getFoldersName: async (req, res) => {
    const folderFind = await Images.find();
    try {
      if (folderFind) {
        // eslint-disable-next-line max-len
        const folderName = folderFind.map((e) => ({folder: e.folder, id: e._id}));
        res.status(200).json({
          response: folderName,
          succes: true,
        });
      }
    } catch (error) {
      response.status(400).json({
        message: error.message,
        success: false,
      });
    }
  },

  getImages: async (req, res) => {
    const folder = req.body.folder;
    const folderFind = await Images.findOne({folder: folder});
    if (folderFind) {
      res.status(200).json({
        response: folderFind.urlList,
        success: true,
      });
    } else {
      res.status(400).json({
        response: 'that folder was not find',
        success: false,
      });
    };
  },
};

module.exports = imgUploader;
