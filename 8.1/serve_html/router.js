// Esportiamo la funzione in modo che main.js possa "importarla" e utilizzarla
exports.handleRequest = function(req, res, serveFile) { // Questa funzione sarà chiamata da main.js ogni volta che arriva una richiesta al server
    // req.url contiene il percorso richiesto dal browser (es: "/", "/css/style.css")
    const url = req.url;

    console.log(`[Router] Richiesta ricevuta per: ${url}`);

    // 1. Gestione delle Views (Pagine HTML)
    // Se la richiesta è la root ("/") serviamo di default index.html
    if (url === '/') {
        // Mappiamo l'URL alla directory corretta secondo lo schema
        const htmlPath = './views/index.html'; 
        serveFile(htmlPath, res); // Chiamiamo la funzione serveFile che abbiamo definito in main.js, passandole il percorso del file e l'oggetto response per inviare la risposta al client
    }
    
    // 2. Gestione degli Asset Pubblici
    // Controlliamo se l'URL termina con una delle estensioni dei nostri file statici
    else if (url.match(/\.(css|js|jpg|png)$/)) {
        // Se l'URL è "/css/style.css", il percorso fisico sul disco deve 
        // diventare "./public/css/style.css"
        const assetPath = `./public${url}`;
        serveFile(assetPath, res);
    }
    
    // 3. Gestione di rotte sconosciute (404 Fallback)
    else {
        // Se l'URL non è né la pagina principale né un asset valido,
        // fermiamo tutto e inviamo un errore
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Rotta non trovata dal Router');
    }
};