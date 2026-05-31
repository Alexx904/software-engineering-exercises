const fs = require('fs'); // Questo modulo ci permette di leggere i file dal filesystem
const path = require('path'); // Questo modulo ci permette di estrarre facilmente l'estensione del file dal percorso del file

// Per gestire dinamicamente l'header in base all'estensione, è molto comodo creare un oggetto che faccia da "mappa". Aggiungi questo sotto le importazioni:

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
};

function serveFile(filePath, res) {
    // fs.readFile legge il file in modo asincrono
    fs.readFile(filePath, (error, data) => {
        if (error) {
            // Se c'è un errore (es. file non trovato), inviamo un 404
            console.log(`Errore nella lettura del file: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File non trovato');
        } else {
            // Se il file esiste, ricaviamo la sua estensione
            // path.extname('./public/css/style.css') restituirà '.css'
            const ext = String(path.extname(filePath)).toLowerCase();
            
            // Cerchiamo il content type nel nostro dizionario, 
            // se non c'è usiamo un tipo generico di default
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            // Inviamo la risposta di successo (200) con gli header e il contenuto del file
            res.writeHead(200, { 'Content-Type': contentType }); // questo header dice al browser che tipo di file stiamo inviando, così il browser sa come gestirlo (es. renderizzare un'immagine o eseguire un file JS)
            res.end(data); // questo invia il contenuto del file al client
        }
    });
}

const http = require('http'); // Questo modulo ci permette di creare un server HTTP

// Importiamo il nostro router personalizzato
// L'estensione .js è sottintesa, Node.js sa di dover cercare router.js
const router = require('./router'); // require è la funzione che ci permette di importare moduli in Node.js. Qui stiamo importando il nostro router personalizzato che abbiamo creato in router.js

// Creiamo il server HTTP
// http.createServer() genera un'istanza del server. 
// La funzione callback al suo interno viene eseguita *ogni singola volta* // che un browser fa una richiesta a questo server.
const server = http.createServer((req, res) => {
    // Invece di scrivere tutta la logica degli if/else qui dentro,
    // deleghiamo il lavoro al nostro router. Gli passiamo:
    // - req: per fargli leggere l'URL
    // - res: per permettergli di inviare la risposta
    // - serveFile: la funzione "attrezzo" che il router userà se trova una rotta valida
    router.handleRequest(req, res, serveFile);
});

const port = 3000; // Scegliamo una porta su cui far ascoltare il server

server.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});