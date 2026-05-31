// 1. Importiamo i dati dal Modello
const coursesData = require('../models/courseModel');

// 2. Creiamo ed esportiamo la nostra funzione controller
exports.showCourses = (req, res) => {
    
    // Assegnamo l'array dei corsi all'oggetto res.locals
    // Questa è la magia di Express: EJS troverà in automatico la variabile "courses"
    res.locals.courses = coursesData;
    
    // Diciamo a Express di generare (renderizzare) la vista chiamata a "courses"
    // Non abbiamo bisogno di specificare l'estensione .ejs, Express lo sa già
    res.render('courses');
};