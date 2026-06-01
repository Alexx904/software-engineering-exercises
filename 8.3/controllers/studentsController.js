// Importiamo il modello degli Studenti per poterli leggere/salvare.
const Student = require('../models/studentModel');
// Importiamo ANCHE il modello dei Corsi. Ci serve perché per iscrivere uno studente 
// dobbiamo potergli mostrare l'elenco dei corsi esistenti!
const Course = require('../models/courseModel'); 

// Iniziamo l'esportazione delle nostre funzioni.
module.exports = {

    // --- FUNZIONE 1: Legge e mostra tutti gli studenti ---
    // Funzione standard che prende richiesta, risposta e next.
    getAllStudents: (req, res, next) => {
        // Cerca tutti gli studenti nel database MongoDB.
        Student.find({})
            // MAGIA ASSOLUTA: '.populate' dice a Mongoose "Guarda il campo 'enrolledCourse' dello studente. 
            // Lì dentro c'è un ID. Vai a cercare il Corso con quell'ID, prendi tutti i suoi dati (nome, tipo) 
            // e incollali qui dentro lo studente al posto del semplice ID".
            .populate('enrolledCourse') 
            // Se la ricerca e il populate vanno a buon fine, riceviamo l'array di studenti "arricchiti".
            .then(students => {
                // Salviamo l'array di studenti nella scatola magica per inviarli all'HTML.
                res.locals.students = students;
                // Generiamo la pagina HTML 'index.ejs' che si trova nella cartella 'students'.
                res.render("students/index");
            })
            .catch(error => next(error));
    },

    // --- FUNZIONE 2: Mostra il form per un nuovo studente ---
    // Questa è leggermente diversa dai corsi, perché prima di mostrare il form vuoto,
    // dobbiamo caricare i dati per il menù a tendina!
    getNewStudent: (req, res, next) => {
        // Interroghiamo PRIMA il database dei corsi per prenderli tutti.
        Course.find({})
            // Quando il DB ci restituisce l'array dei corsi...
            .then(courses => {
                // ...li salviamo in res.locals. Li useremo nel file HTML per creare un <select> (menù a tendina).
                res.locals.courses = courses;
                // Solo ORA che abbiamo i corsi pronti, diciamo a Express di mostrare il form 'new.ejs'.
                res.render("students/new");
            })
            .catch(error => next(error));
    },

    // --- FUNZIONE 3: Salva un nuovo studente nel Database ---
    // Chiamata quando premiamo "Invia" sul form del nuovo studente.
    saveStudent: (req, res, next) => {
        // Assembliamo il nuovo studente usando i dati estratti dal body della richiesta.
        let newStudent = new Student({
            // Estrae dal form HTML il campo <input name="firstName">
            firstName: req.body.firstName,
            // Estrae dal form HTML il campo <input name="lastName">
            lastName: req.body.lastName,
            // Estrae dal form HTML il campo <input name="matricola">
            matricola: req.body.matricola,
            // Estrae dal form HTML il campo <select name="courseId"> (il menù a tendina).
            // Qui dentro ci arriverà l'ID alfanumerico del corso selezionato!
            enrolledCourse: req.body.courseId 
        });

        // Salva fisicamente lo studente assemblato nel database.
        newStudent.save()
            // Se il salvataggio va a buon fine...
            .then(student => {
                // ...impostiamo la bussola verso la rotta "/students" (la lista di tutti gli studenti).
                res.locals.redirect = "/students";
                // ...e passiamo il controllo alla funzione redirectView per eseguire lo spostamento.
                next();
            })
            .catch(error => next(error));
    },

    // --- FUNZIONE 4: Redirect (Identica a quella dei Corsi) ---
    // Reindirizza l'utente dopo il salvataggio.
    redirectView: (req, res, next) => {
        // Legge la destinazione.
        let redirectPath = res.locals.redirect;
        // Se c'è una destinazione, esegue il redirect.
        if (redirectPath) res.redirect(redirectPath);
        // Altrimenti passa la mano.
        else next();
    }
};