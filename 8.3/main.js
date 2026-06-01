// 1. Importazione dei pacchetti
const express = require('express'); // importazione di Express.js per creare il server web
const mongoose = require('mongoose'); // importazione di Mongoose per interagire con MongoDB, un database NoSQL molto popolare

// Creazione dell server Express
const app = express();
const port = 3000;

// 2. Connessione al Database MongoDB tramite Mongoose
mongoose.connect("mongodb://localhost:27017/university_db", {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => { 
    console.log("Connesso a MongoDB con successo!"); 
});

// 3. Configurazione dell'applicazione (La "Magia" dei Middleware)
app.set("view engine", "ejs"); // Imposta EJS come motore di template
app.use(express.urlencoded({ extended: false })); // Permette di leggere i dati dai form HTML
app.use(express.json()); // Permette di leggere i dati in formato JSON

// 4. Avvio del server
app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
});