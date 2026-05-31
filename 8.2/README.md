# npm init -y
## per creare il package.json

# npm install express ejs
## È il framework web per eccellenza di Node.js. Senza Express, dovresti scrivere decine di righe di codice complesso a basso livello solo per capire se un utente ha richiesto una pagina web (usando il modulo http nativo). Express gestisce tutta questa complessità dietro le quinte: tu dovrai solo dirgli "se l'utente va all'indirizzo X, mostragli la pagina Y".

# npm install --save-dev nodemon
## Normalmente, ogni volta che modifichi il codice del tuo server, devi spegnerlo e riaccenderlo manualmente dal terminale per vedere le modifiche. nodemon osserva i tuoi file: appena salvi una modifica, riavvia il server da solo. Il flag --save-dev dice a package.json che questo pacchetto ci serve solo mentre programmiamo, non quando il sito andrà online.

Per testare: node .\main.js