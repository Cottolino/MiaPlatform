const { response } = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const fs = require('fs');

console.log(process.env.APP_PWD);

//Creazione web server
const server = http.createServer((req, res) => {
    let body = '';
    let htmlfile = '';
    switch(req.url) 
    {
        case '/':
        case '/home':
            // res.statusCode = 200;
            // body = 'Sei in home page';
            htmlfile = 'index.html';
            break;
        case '/contatti':
            // res.statusCode = 200;
            // body = 'Sei nella pagina contatti';
            htmlfile = 'contatti.html';
            break;
        default:
            // res.statusCode = 404;
            // body = 'Pagina non trovata';
            htmlfile = '404.html';
            break;
    }
    res.setHeader('Content-Type', 'text/html');
    if(htmlfile)
    {
        fs.readFile(`./${htmlfile}`,'utf8', (err, data) => {
            if(err)
            {
                res.statusCode = 500;
                return res.end('Errore interno');
            }
            res.statusCode = 200;
            res.end(data);
        });
    }

});

//Attivazione del server sulla porta 3000
server.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

