const router = require('express').Router(); // create an express router
let User = require('../models/user.model'); // use user mongoose model

// http endpoint which handles get requests on users url path
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users)) // return users found in database if exists
        .catch(err => res.status(400).json('Error: ' + err)); // return error if not
});

// http endpoint which handles post requests on users url path
router.route('/add').post((req, res) => {
    const username = req.body.username; // username is in body of request 

    const newUser = new User({username}); // new user created from username

    newUser.save() // save user
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; // export router