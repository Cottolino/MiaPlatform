// Description: This is the entry point of the application
// Version: 1.0
// Autor: Giuseppe Cottone
// ----------------------------------------------------------

//API GATEWAY
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://giuseppe2:db_123@maestro-node.kumsrrs.mongodb.net/?retryWrites=true&w=majority&appName=maestro-node');

const bodyParser = require('body-parser');
const { LibroCollection } = require('./libro.class');

const libroCollection = new LibroCollection();
// const libro = new actionLib();

const port = 3000;

//TEST SESSION
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: 'miaChiaveSegreta123',
    resave: false,
    saveUninitialized: true,
    //secure: true: http -> https
    cookie: { secure: false },
    genid: () =>  uuidv4() ,
    store: MongoStore.create({ client: client, dbName: 'MiaLibri' })
  }));
//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    libroCollection.ping();
});

// libroCollection.test();
// libroCollection.testInsert();

app.get('/info', (req, res) => {
    console.log(req.session.isLogged);
    res.send('Info');
});
app.get('/login', (req,res) => {
    console.log(req.session.id);
    req.session.isLogged = true;
    res.send();
});
app.get('/logout', (req,res)=> {
    req.session.destroy((err) => console.log(err));
    res.send();
});

//Microservizio per la gestione dei libri
app.get('/libri', (req, res) => {
    if(req.session.isLogged){
        console.log('Sei loggato');
    }
    else{
        console.log('Non sei loggato');
    }

    libroCollection.fetchCollection();

    // libroColection.fetchCollection().then( () => {
        
    // }).catch();

    // const libri = await libroCollection.fetchCollection();

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
    });

    setTimeout(() => {
        res.send(libro);
    }, 3000);

});

app.get('/add-libro', (req, res) => {
    libroCollection.addLibro({
        titolo: 'AddLibro2',
        autore: 'AddLibro2',
        prestito: false,
        reso: false
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

    libroCollection.on('delLibro', (collection) => {
        console.log('Libro Eliminato');
    });
    
    setTimeout(() => {
        res.send('Libro Eliminato!');
    }, 3000);

});

app.get('/fetch-libro', (req, res) => {
    libro.fetch('Giuseppe');

    libro.on('fetch', (ele) => {
        console.log('Libro Fetch');
        console.log(libro.libro);
    });

    res.send('Libro Fetch');
});

app.get('/test', (req, res) => {
    res.send('Test');
});

app.get('/text-info', (req,res) => {
    libroCollection.textinfo();
    res.send('Text Info');
});
