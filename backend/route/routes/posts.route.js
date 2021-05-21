const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/PostsController');


router.delete('/:id', postsController.deletePost);
router.get('/edit/:id', postsController.getPost);


router.post('/', postsController.add);
router.put('/:id', postsController.edit);





router.get('/', postsController.index);

module.exports = router;