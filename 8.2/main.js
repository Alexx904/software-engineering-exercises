// 1. Importiamo la magia di Express
const express = require('express');

// 2. Creiamo l'applicazione web istanziando Express
const app = express();
const port = 3000; // Definiamo la porta su cui il server starà in ascolto

// 3. Importiamo il nostro Controller
const courseController = require('./controllers/courseController');

// --- LA MAGIA DEL VIEW ENGINE ---
// Diciamo a Express di usare EJS come motore di template
app.set("view engine", "ejs");

// --- DEFINIZIONE DELLE ROTTE (ROUTING) ---

// 4. Diciamo ad Express: "Quando ricevi una richiesta GET all'indirizzo /corsi, 
// passa la palla alla funzione showCourses del nostro controller"
app.get('/corsi', courseController.showCourses);

// Opzionale: facciamo in modo che anche la homepage ( / ) mostri i corsi
app.get('/', courseController.showCourses);

// --- ACCENSIONE DEL SERVER ---
// Mettiamo il server in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`Il server è acceso e in ascolto sulla porta ${port}`);
    console.log(`Visita http://localhost:${port}/corsi per vedere il risultato!`);
});