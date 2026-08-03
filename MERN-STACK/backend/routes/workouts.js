const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController'); // ! questo serve per importare le funzioni del controller workoutController.js

const router = express.Router(); // ! questo serve per creare un router express.

// * GET all workouts
router.get('/', getWorkouts); // ! questo serve per gestire le richieste GET alla root del router

// * GET a single workout
router.get('/:id', getSingleWorkout);

// * POST a new workout
router.post('/', createWorkout); // ! praticamente va a richiamare createWorkout che è una funzione che si trova nel controller workoutController.js e che serve per creare un nuovo workout nel database

// * DELETE a workout
router.delete('/:id', deleteWorkout); 

// * UPDATE a workout
router.patch('/:id', updateWorkout);


module.exports = router; // ! questo serve per esportare il router in modo che possa essere utilizzato in altri file