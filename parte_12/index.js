const { response } = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const fs = require('fs');

// console.log(process.env.APP_PWD);

//Creazione web server
const server = http.createServer((req, res) => {

    let htmlfile = '';
    const routing = {
        '/': 'index.html',
        '/home': 'index.html',
        '/contatti': 'contatti.html',
    };

    res.setHeader('Content-Type', 'text/html');
    // render(res, routing[req.url]);
    render2(res, routing[req.url]);
    console.log(req.method);
    


});

//Attivazione del server sulla porta 3000
server.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

function render(res,htmlfile)
{
    if(htmlfile)
    {
        fs.readFile(`./${htmlfile}`,'utf8', (err, data) => 
        {
            if(err)
            {
                res.statusCode = 500;
                return res.end('Errore interno');
            }
            res.statusCode = 200;
            res.end(data);
        });
    }
    else
    {
        res.statusCode = 404;
        res.end('Pagina non trovata');
    }
}

function render2(res,htmlfile)
{
    fs.stat(`./${htmlfile}`, (err, stats) => 
    {
        if(stats)
        {
            res.statusCode = 200;
            const readStream = fs.createReadStream(`./${htmlfile}`);
            readStream.pipe(res);
        }
        else
        {
            res.statusCode = 404;
            res.end('Pagina non trovata');
        }

    });
}