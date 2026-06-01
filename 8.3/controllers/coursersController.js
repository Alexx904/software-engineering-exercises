// Importiamo il modello 'Course' che abbiamo creato nel Passo 2. 
// Ci serve perché è l'unico modo che abbiamo per interrogare il database MongoDB sui corsi.
const Course = require('../models/courseModel'); 

// 'module.exports' crea un "pacchetto" contenente tutte le funzioni scritte qui dentro, 
// in modo che altri file (come le rotte) possano importarle e usarle.
module.exports = {

    // --- FUNZIONE 1: Legge e mostra tutti i corsi ---
    // Definiamo la funzione 'getAllCourses'. Richiede 3 parametri forniti da Express:
    // req (la richiesta dell'utente), res (la nostra risposta), next (per passare all'operazione successiva).
    getAllCourses: (req, res, next) => {
        // Usiamo il modello Course per cercare nel database. Le parentesi graffe vuote {} significano "trova TUTTI i documenti".
        Course.find({})
            // .then() si attiva solo se la ricerca ha successo. 'courses' conterrà l'array dei corsi trovati nel DB.
            .then(courses => {
                // res.locals è una "variabile globale temporanea". Ci salviamo dentro l'array 'courses'.
                // Tutto ciò che è in res.locals viene inviato in automatico alle pagine HTML/EJS.
                res.locals.courses = courses; 
                // Dice a Express di prendere il file 'index.ejs' (nella cartella views/courses), 
                // compilarlo con i dati, e inviare l'HTML finale al browser dell'utente.
                res.render("courses/index"); 
            })
            .catch(error => {
                console.log(`Errore nel recupero dei corsi: ${error.message}`);
                next(error);
            });
    // Chiude la funzione getAllCourses
    },

    // --- FUNZIONE 2: Mostra la pagina col form per un nuovo corso ---
    // Definiamo la funzione 'getNewCourse'. Non ci serve 'next' qui perché facciamo solo un'azione semplice.
    getNewCourse: (req, res) => {
        // Dice a Express di mostrare il file 'new.ejs' (il nostro form HTML vuoto).
        res.render("courses/new");
    },

    // --- FUNZIONE 3: Salva un nuovo corso nel Database ---
    // Questa funzione viene chiamata quando l'utente preme "Invia" sul form HTML.
    saveCourse: (req, res, next) => {
        // Creiamo una nuova "istanza" del modello Course. Stiamo assemblando l'oggetto prima di salvarlo.
        let newCourse = new Course({
            // Prende il testo che l'utente ha scritto nel campo HTML <input name="name"> e lo assegna alla proprietà 'name'.
            name: req.body.name,
            // Prende il testo dal campo <input name="degreeType"> e lo assegna alla proprietà 'degreeType'.
            degreeType: req.body.degreeType
        });

        // Prende l'oggetto appena creato e lo salva FISICAMENTE dentro il database MongoDB.
        newCourse.save()
            // Se il salvataggio va a buon fine, MongoDB ci restituisce il corso salvato (che ora ha un ID univoco).
            .then(course => {
                // Prepariamo la strada per il redirect: salviamo in res.locals il percorso a cui vogliamo mandare l'utente.
                res.locals.redirect = "/courses"; 
                // Abbiamo finito qui, ma invece di rispondere direttamente all'utente, passiamo la palla...
                next(); // ...alla funzione redirectView (che chiameremo subito dopo nelle rotte).
            })
            // Se il salvataggio fallisce (es. mancava un campo obbligatorio), catturiamo l'errore.
            .catch(error => {
                // Stampiamo l'errore nel terminale.
                console.log(`Errore nel salvataggio: ${error.message}`);
                // Passiamo l'errore al sistema per bloccare tutto.
                next(error);
            });
    },

    // --- FUNZIONE 4: Gestisce il reindirizzamento (Redirect) ---
    // È una funzione "postino", serve solo a spostare l'utente su un'altra pagina dopo un'operazione.
    redirectView: (req, res, next) => {
        // Legge il percorso di destinazione che avevamo salvato prima in res.locals.redirect.
        let redirectPath = res.locals.redirect;
        // Se redirectPath esiste (ovvero non è vuoto/undefined)...
        if (redirectPath) 
            // ...forza il browser dell'utente a caricare quel nuovo URL (es. lo riporta alla lista dei corsi).
            res.redirect(redirectPath);
        // Altrimenti (se non c'è nessun redirect impostato)...
        else 
            // ...passa il controllo alla prossima funzione disponibile.
            next();
    }
};