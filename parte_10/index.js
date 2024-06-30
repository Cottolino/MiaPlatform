const { response } = require('express');
const http = require('http');
const port = process.env.PORT || 3000;

console.log(process.env.APP_PWD);

//Creazione web server
const server = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') {
        res.statusCode = 204;
        return res.end();
    }
    let body = '';
    if(req.url == '/' || req.url == '/home')
    {
        req.statusCode = 200;
        res.end('Sei in home page');
    }
    else if(req.url == '/contatti')
    {
        req.statusCode = 200;
        res.end('Sei nella pagina contatti');
    }
    else
    {
        req.statusCode = 404;
        res.end('Pagina non trovata');
    }

});

//Attivazione del server sulla porta 3000
server.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

