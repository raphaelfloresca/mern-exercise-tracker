const router = require('express').Router(); // create an express router
let Exercise = require('../models/exercise.model'); // use exercise mongoose model

// http endpoint which handles get requests on exercises url path
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises)) // return exercises found in database if exists
        .catch(err => res.status(400).json('Error: ' + err)); // return error if not
});

// http endpoint which handles post requests on exercises url path
router.route('/add').post((req, res) => {
    const username = req.body.username; 
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    // new exercise created
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    }); 

    newExercise.save() // save user
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get information about particular exercise
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete particular exercise
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update particular exercise
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; // export router