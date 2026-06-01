const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    matricola: { type: String, required: true, unique: true },
    
    // La magia della relazione (Iscrizione al Corso)
    // Dicendo a Mongoose che il campo enrolledCourse è di tipo mongoose.Schema.Types.ObjectId
    // e che fa riferimento (ref: "Course") al modello Course , gli stiamo dicendo che lì dentro
    // salveremo solo l'ID univoco di un corso. Più avanti, Mongoose userà una funzione speciale chiamata .populate()
    // per andare a recuperare in automatico tutti i dati di quel corso partendo solo dal suo ID.
    // È come se facesse una JOIN di SQL dietro le quinte!
    enrolledCourse: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
    }
});

module.exports = mongoose.model("Student", studentSchema);