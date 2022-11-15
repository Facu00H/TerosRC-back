const cloudinary = require('cloudinary');

const {
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise( (resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        id: result.public_id,
      });
    }, {
      resource_type: 'auto',
      folder: folder,
    });
  });
};
