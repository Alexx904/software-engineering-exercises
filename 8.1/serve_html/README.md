# npm init -y
per creare il package.json

# node .\main.js
Per testare

# Custom Node.js Static Server & Router

Questo progetto è un esercizio pratico per comprendere le basi dello sviluppo web lato server utilizzando esclusivamente i moduli nativi di Node.js (`http`, `fs`, `path`). L'obiettivo è creare un server web minimale capace di servire file HTML e asset statici (CSS, JS, immagini) implementando un sistema di routing manuale, senza l'ausilio di framework esterni come Express.

## 📂 Struttura del Progetto

Il progetto segue una rigorosa separazione delle responsabilità, dividendo le view HTML dagli asset pubblici e separando la logica di routing dall'avvio del server.

```text
serve_html/
│
├── main.js           # Entry point: inizializza il server e gestisce il File System
├── router.js         # Contiene la logica di instradamento (Routing) degli URL
├── package.json      # Manifest del progetto Node.js
│
├── views/            # Directory per le pagine HTML
│   └── index.html    # View principale servita sulla rotta '/'
│
└── public/           # Directory per gli asset statici (pubblici)
    ├── css/          # Fogli di stile (es. style.css)
    ├── js/           # Script lato client (es. app.js)
    └── images/       # Immagini (.jpg, .png)