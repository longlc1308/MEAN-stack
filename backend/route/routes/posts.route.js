const express = require('express');


const multer = require('multer');


const router = express.Router();
const postsController = require('../../controllers/PostsController');
const checkAuth = require('../../middlewares/check-auth');


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'

};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images/");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype]
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
});


router.delete('/:id', checkAuth, postsController.deletePost);
router.get('/edit/:id', postsController.getPost);


router.post('/', checkAuth, multer({ storage: storage }).single("image"), postsController.add);
router.put('/:id', checkAuth, postsController.edit);





router.get('/', postsController.index);

module.exports = router;