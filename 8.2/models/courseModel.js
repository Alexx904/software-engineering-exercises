// Questo è il nostro "modello" dei corsi, un semplice array di oggetti.
const courses = [
    {
        name: "Ingegneria Informatica e dell'Automazione",
        type: "Corso di Laurea",
        imagePath: "/images/ing-info-auto.jpg"
    },
    {
        name: "Ingegneria Informatica",
        type: "Corso di Laurea Magistrale",
        imagePath: "/images/ing-info-magistrale.jpg"
    },
    {
        name: "Ingegneria Civile e Ambientale",
        type: "Corso di Laurea",
        imagePath: "/images/ing-civile.jpg"
    }
];

// Ecco la magia di Node.js: esportiamo l'array per renderlo pubblico!
module.exports = courses;