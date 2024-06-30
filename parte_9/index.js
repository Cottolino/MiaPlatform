const { response } = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const host = 'localhost';

console.log(process.env.APP_PWD);

//Creazione web server
const server = http.createServer((req, res) => {
    console.log('Richiesta ricevuta');
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    // res.write('Ciao Mondo!');
    // res.write('Ciao Mondo!');
    // res.end();
    
    const body = 'Questo è il corpo della risposta del server';
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain charset=utf-8'
    });
    res.end(body);
});

//Attivazione del server sulla porta 3000
server.listen(port, host, () => {
    console.log(`Server running on port ${port}...`);
});

//Gestione degli errori
server.on('error', (err) => {
    console.error(err);
});