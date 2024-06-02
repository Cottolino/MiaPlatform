// Description: This is the entry point of the application
// Version: 1.0
// Autor: Giuseppe Cottone
// ----------------------------------------------------------

//API GATEWAY
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { LibroCollection, actionLib } = require('./libro.class');

const libroCollection = new LibroCollection();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


//Microservizio per la gestione dei libri
app.get('/libri', (req, res) => {
    libroCollection.fetchCollection();

    libroCollection.on('fetchCollection', (collection) => {
        console.log(libroCollection.collection);
        console.log('fetchCollection');
    }); 
    res.send(libroCollection.collection);
});

app.get('/test', (req, res) => {
    res.send('Test');
});
