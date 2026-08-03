const Workout = require('../models/workoutModel'); // ! questo serve per importare il modello Workout dal file workoutModel.js

// * GET all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}); // ! questo serve per trovare tutti i workout nel database utilizzando il modello Workout
        res.status(200).json(workouts); // ! questo serve per inviare una risposta con lo status 200 (OK) e i workout trovati
    } catch (error) {
        res.status(400).json({ error: error.message }); // ! questo serve per inviare una risposta con lo status 400 (Bad Request) e il messaggio di errore
    }
}


// * GET a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params; // ! questo serve per estrarre l'id del workout dai parametri della richiesta
    try {
        const workout = await Workout.findById(id); // ! questo serve per trovare un workout nel database utilizzando l'id
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' }); // ! questo serve per inviare una risposta con lo status 404 (Not Found) se il workout non è stato trovato
        }
        res.status(200).json(workout); // ! questo serve per inviare una risposta con lo status 200 (OK) e il workout trovato
    } catch (error) {
        res.status(400).json({ error: error.message }); // ! questo serve per inviare una risposta con lo status 400 (Bad Request) e il messaggio di errore
    }
}

// * POST a new workout
const createWorkout = async (req, res) => {
        const { title, reps, load } = req.body; // ! questo serve per estrarre i dati dal body della richiesta
    
    try {
        const workout = await Workout.create({ title, reps, load }); // ! questo serve per creare un nuovo workout nel database utilizzando il modello Workout
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// * DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findByIdAndDelete({ _id: id }); // ! questo serve per trovare un workout nel database utilizzando l'id e cancellarlo
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// * UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, {
            ...req.body // stanno ... per fare un spread operator che prende tutte le proprietà del body della richiesta e le passa come aggiornamenti al documento trovato
        });
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { // ! questo serve per esportare la funzione createWorkout in modo che possa essere utilizzata in altri file
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}; 