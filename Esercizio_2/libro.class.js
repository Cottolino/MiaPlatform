const events = require('events');   
const e = require('express');
const { MongoClient, ObjectId } = require('mongodb');

class Libro
{
    constructor(titolo, autore)
    {
        this.titolo = titolo;
        this.autore = autore;
        this.prestito = false;
        this.reso = false;
    }
    
}

class LibroCollection extends events.EventEmitter {
    
    collection = [];

    dbLibro;
    collectionLibro;


    
    constructor() {

        super();
        this.dbURI = 'mongodb+srv://giuseppe2:db_123@maestro-node.kumsrrs.mongodb.net/?retryWrites=true&w=majority&appName=maestro-node';
        this.client = new MongoClient(this.dbURI);

        this.run().catch(err => console.log('ErroreConnessione'+ err));
        
    }
    //Stampa di prova
    test()
    {
        console.log('Test');
        console.log(this.client);
    }

    //Test Inserimento
    testInsert()
    {
        this.collectionLibro.insertOne({ titolo: 'Giuseppe', autore: 'Cottone' });
        console.log('Inserito');
    }

    //Controllo connessione
    async ping()
    {
        let pingResult = await this.client.db().admin().ping();
        if(pingResult.ok == 1)
        {
            console.log('Connesso');
        }
        else
        {
            console.log('Non Connesso');
        }
    }

    //Connessione al database
    async run()
    {
        this.client.connect();
        this.dbLibro = this.client.db('MiaLibri');
        this.collectionLibro = this.dbLibro.collection('libri');

    }

    //Da eseguire prima delle azioni
    //Ok!
    async fetchCollection()
    {
        //API esterna

        //API interna
        const cursor = await this.collectionLibro.find();
        this.collection = await cursor.toArray();
        
        this.emit('fetchCollection', this.collection);
    }
    //Da eseguire dopo le azioni
    //Ok!
    saveCollection()
    { 
        //API per salvare la collection

        //API interna
        this.collectionLibro.find({}).forEach(libro => {
            this.collectionLibro.updateOne({_id: libro._id},{$set: {titolo: libro.titolo, autore: libro.autore, prestito: libro.prestito, reso: libro.reso}});
        });
        this.emit('saveCollection', this.collection);
    }
    //Ok!
    async getLibro(titolo) 
    {
        const articolo = await this.collectionLibro.find({titolo: titolo});
        const art = await articolo.toArray();
        this.emit('getlibro', art);
    }
    getLibri()
    {
        this.emit('getlibri', this.collection);
    }
    //Ok!
    addLibro(libro)
    {
        this.collectionLibro.insertOne(libro);
        this.emit('addLibro', libro);
    }
    modLibro(libro) 
    {
        this.emit('modLibro', libro);
    }
    //Ok!
    delLibro(libro)
    {
        this.collectionLibro.deleteOne(libro);
        this.emit('delLibro', libro);
    }

}

class actionLib extends events.EventEmitter {

    libro = new Libro('Il Signore degli Anelli', 'J.R.R. Tolkien');
    
    constructor() {
        super();
    }

    //Da eseguire prima delle azioni
    fetch(titolo)
    {
        //API per recuperare il libro
        this.emit('fetch', this.libro);
    }
    //Da eseguire dopo le azioni
    save()
    {
        //API per salvare il libro
        this.emit('save', this.libro);
    }
    prestito(libro)
    {
        this.emit('prestito', this.libro);
    }
    reso()
    {
        this.emit('reso', this.libro);
    }
    info()
    {
        this.emit('info', this.libro);
    }
}


module.exports = { LibroCollection, actionLib };