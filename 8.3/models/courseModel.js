const mongoose = require('mongoose'); // Importazione di Mongoose per definire lo schema e il modello del corso

// Definiamo lo Schema (la "mappa" del documento)
const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    degreeType: { 
        type: String, 
        required: true // es. "Corso di Laurea Magistrale"
    }
});

// Esportiamo il Modello compilato basato sullo schema
module.exports = mongoose.model("Course", courseSchema);