// Importiamo le rotte
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');

// Diciamo a Express: "Tutte le richieste che iniziano per /students, passale al router degli studenti" [cite: 928-931]
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);