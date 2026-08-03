// Questo file serve per definire il modello di dati per i workout, che sarà utilizzato per interagire con il database MongoDB tramite Mongoose.

const mongoose = require('mongoose');

const Schema = mongoose.Schema; // ! questo serve per creare uno schema mongoose, che è una rappresentazione della struttura dei dati che vogliamo salvare nel database

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true // ! questo serve per indicare che il campo title è obbligatorio
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true }); // ! questo serve per indicare che vogliamo che mongoose aggiunga automaticamente i campi createdAt e updatedAt al nostro schema

module.exports = mongoose.model('Workout', workoutSchema); // ! questo serve per creare un modello mongoose chiamato Workout basato sullo schema workoutSchema, e per esportarlo in modo che possa essere utilizzato in altri file

