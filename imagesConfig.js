const multer = require('multer');

const storage = multer.diskStorage({ //cb for callback function
    destination: (req, file, cb) => {
        cb(null, 'public/images'); //the first param is an error object
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

module.exports = upload;