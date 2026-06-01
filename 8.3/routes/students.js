const router = require('express').Router();
const studentsController = require('../controllers/studentsController');

// Mappiamo le richieste GET (quando l'utente digita l'URL o clicca un link)
router.get('/', studentsController.getAllStudents);
router.get('/new', studentsController.getNewStudent);

// Mappiamo la richiesta POST (quando l'utente invia il form HTML).
// Qui concateniamo i middleware: PRIMA salva lo studente, POI esegue il redirect.
router.post('/create', studentsController.saveStudent, studentsController.redirectView);

module.exports = router;