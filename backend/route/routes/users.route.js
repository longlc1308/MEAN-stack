const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/UsersController');

router.post("/signup", usersController.index)
router.post("/login", usersController.login)


module.exports = router;