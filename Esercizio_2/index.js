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
    libroCollection.ping();
});

// libroCollection.test();
// libroCollection.testInsert();



//Microservizio per la gestione dei libri
app.get('/libri', (req, res) => {
    libroCollection.fetchCollection();

    libroCollection.on('fetchCollection', (collection) => {
        console.log(libroCollection.collection);
        console.log('fetchCollection');
    }); 
    
    setTimeout(() => {  
        res.send(libroCollection.collection);
    }, 3000);
});

app.get('/salva-libri', (req, res) => {
    libroCollection.saveCollection();

    libroCollection.on('saveCollection', (collection) => {
        console.log('collection Aggiornata');
    });

    res.send('Libri Salvati');
});

app.get('/libro', (req, res) => {
    var libro;
    libroCollection.getLibro('Giuseppe');

    libroCollection.on('getlibro', (collection) => {
        libro = collection;
        console.log(libro);
        console.log('getlibro');
    });

    setTimeout(() => {
        res.send(libro);
    }, 3000);

});

app.get('/add-libro', (req, res) => {
    libroCollection.addLibro({
        titolo: 'AddLibro',
        autore: 'AddLibro'
    });

    libroCollection.on('addLibro', (collection) => {
        console.log('Libro Aggiunto');
    });

    setTimeout(() => {
        res.send('Libro Aggiunto!');
    }, 3000);

});
app.get('/del-libro', (req, res) => {
    libroCollection.delLibro({
        titolo: 'Giuseppe',
    });
    console.log('Libro Eliminato');
    
    setTimeout(() => {
        res.send('Libro Eliminato!');
    }, 3000);

});

app.get('/test', (req, res) => {
    res.send('Test');
});
