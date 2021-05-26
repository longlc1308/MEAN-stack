const User = require('./../models/users.class');
const bcrypt = require('bcrypt');


class UsersController {
    index(req, res, next) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: " User created!",
                            result: result
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            })
    }
}
module.exports = new UsersController();