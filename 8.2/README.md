# npm init -y
per creare il package.json

# npm install express
È il framework web per eccellenza di Node.js. Senza Express, dovresti scrivere decine di righe di codice complesso a basso livello solo per capire se un utente ha richiesto una pagina web (usando il modulo http nativo). Express gestisce tutta questa complessità dietro le quinte: tu dovrai solo dirgli "se l'utente va all'indirizzo X, mostragli la pagina Y".

# npm install ejs

# npm install --save-dev nodemon
Normalmente, ogni volta che modifichi il codice del tuo server, devi spegnerlo e riaccenderlo manualmente dal terminale per vedere le modifiche. nodemon osserva i tuoi file: appena salvi una modifica, riavvia il server da solo. Il flag --save-dev dice a package.json che questo pacchetto ci serve solo mentre programmiamo, non quando il sito andrà online.

# npx nodemon main.js
Per testing

# 🎓 Offerta Formativa Ateneo - Esercizio 8.2

Questa è un'applicazione web sviluppata in **Node.js** ed **Express** che mostra l'elenco dei corsi di laurea offerti da un'università. Il progetto è stato realizzato con finalità didattiche per mettere in pratica i fondamenti dello sviluppo back-end e il pattern architetturale **MVC (Model-View-Controller)**.

## 🚀 Tecnologie Utilizzate

* **Node.js**: L'ambiente di runtime per eseguire JavaScript lato server.
* **Express.js**: Il framework minimalista utilizzato per la gestione del routing e delle richieste HTTP.
* **EJS (Embedded JavaScript)**: Il template engine impiegato per generare dinamicamente le viste HTML iniettando i dati dal server.
* **Nodemon**: (DevDependency) Utility per il riavvio automatico del server durante le fasi di sviluppo.

## 📁 Struttura del Progetto (Pattern MVC)

L'architettura del codice è rigorosamente separata per responsabilità:

\`\`\`text
8.2/
├── controllers/
│   └── courseController.js   # Logica di business: elabora le richieste e invia i dati alle viste
├── models/
│   └── courseModel.js        # Struttura dei dati: simula un database contenente l'array dei corsi
├── views/
│   └── courses.ejs           # Interfaccia utente: template HTML/EJS per la renderizzazione
├── main.js                   # Entry point: configurazione di Express, View Engine e Routing
├── package.json              # Configurazioni di npm e dipendenze del progetto
└── README.md                 # Documentazione del progetto
\`\`\`

## 🛠️ Prerequisiti

Per eseguire questo progetto sul tuo computer locale, devi avere installato:
* [Node.js](https://nodejs.org/) (versione 14.x o superiore consigliata)
* **npm** (normalmente incluso nell'installazione di Node.js)

## ⚙️ Installazione e Avvio

1.  **Clona o scarica** questa repository sul tuo computer.
2.  Apri il terminale e naviga all'interno della cartella del progetto:
    \`\`\`bash
    cd 8.2
    \`\`\`
3.  **Installa le dipendenze** necessarie leggendo il file \`package.json\`:
    \`\`\`bash
    npm install
    \`\`\`
4.  **Avvia il server di sviluppo** (utilizzando Nodemon per l'hot-reloading):
    \`\`\`bash
    npx nodemon main.js
    \`\`\`
    *(In alternativa, puoi avviare il server in modalità standard con il comando `node main.js`)*

5.  Apri il tuo browser e visita l'indirizzo: **\`http://localhost:3000/corsi\`**

## 💡 Dettagli Implementativi

* **res.locals**: Il passaggio dei dati (l'array dei corsi) dal Controller alla Vista avviene sfruttando l'oggetto magico di Express \`res.locals\`, che rende le variabili globalmente accessibili all'interno del file EJS senza necessità di passaggi complessi.
* **Rendering Ciclico**: La vista \`courses.ejs\` utilizza i tag speciali di EJS (\`<% for... %>\` e \`<%= %>\`) per scorrere dinamicamente l'array dei corsi e generare blocchi HTML per ciascun elemento, garantendo una scalabilità immediata qualora si aggiungessero nuovi corsi al Modello.

---
*Progetto sviluppato come esercitazione per il corso di Fondamenti del Web.*