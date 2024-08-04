const events = require('events');   
const e = require('express');
const { MongoClient, ObjectId } = require('mongodb');



class LibroCollection extends events.EventEmitter {
    
    //Array di libri
    collection = [];
    //Riferimento al database
    dbLibro;
    //Riferimento alla collection
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
        //Database
        this.dbLibro = this.client.db('MiaLibri');
        //Collection
        this.collectionLibro = this.dbLibro.collection('libri');

    }

    //Da eseguire prima delle azioni
    //Ok!
    async fetchCollection()
    {
        //API esterna

        //API interna
        const cursor = await this.collectionLibro.find();
        // this.collection = await cursor.toArray();

        //Push dei libri con classe actionLib
        while(await cursor.hasNext())
        {
            const libricino = await cursor.next();
            var temp = new Libro(libricino.titolo, libricino.autore, libricino._id);
            this.collection.push(temp);
        }
        
        this.emit('fetchCollection', this.collection);
    }
    //Da eseguire dopo le azioni
    //Ok!
    //Aggiorna la collection
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
        // const articolo = await this.collectionLibro.find({titolo: titolo});
        // const art = await articolo.toArray();
        // this.emit('getlibro', art);

        // console.log(this.collection);
        this.collection.forEach(libro => {
            if(libro.titolo == titolo)
            {
                console.log(libro);
                this.emit('getlibro', libro);
            }
        });
        console.log('getlibro');
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
        //Passo un oggetto a deleteOne il filtro
        this.collectionLibro.deleteOne(libro);
        this.emit('delLibro', libro);
    }
    textinfo()
    {
        this.collection.forEach(libro => {
            libro.dettagli();
        });
    }

}

//*************************DA CANCELLARE!!!*********************************** */
// class actionLib extends events.EventEmitter {

//     // libro = new Libro('Il Signore degli Anelli', 'J.R.R. Tolkien');
//     libro;
//     dbLibro;
//     collectionLibro;
    
//     constructor() {
//         super();
//         // this.dbURI = 'mongodb+srv://giuseppe2:db_123@maestro-node.kumsrrs.mongodb.net/?retryWrites=true&w=majority&appName=maestro-node';
//         // this.client = new MongoClient(this.dbURI);

//         // this.run().catch(err => console.log('ErroreConnessione'+ err));
//     }


//     //*****************************DA RIFARE******************************************** */

//     //Connessione al database
//     async run()
//     {
//         this.client.connect();
//         this.dbLibro = this.client.db('MiaLibri');
//         this.collectionLibro = this.dbLibro.collection('libri');

//     }

//     //Da eseguire prima delle azioni
//     async fetch(titolo)
//     {
//         //API per recuperare il libro

//         //API interna
//         const cursor = await this.collectionLibro.find({titolo: titolo});
//         this.libro = await cursor.next();
//         this.emit('fetch', this.libro);
//     }
//     //Da eseguire dopo le azioni
//     save()
//     {
//         //API per salvare il libro
//         this.collectionLibro.updateOne({_id: this.libro._id},{$set: {titolo: this.libro.titolo, autore: this.libro.autore, prestito: this.libro.prestito, reso: this.libro.reso}});
//         this.emit('save', this.libro);
//     }
//     prestito(libro)
//     {
//         this.collectionLibro.updateOne({_id: libro._id},{$set: {prestito: true, reso: false}});
//         this.emit('prestito', this.libro);
//     }
//     reso()
//     {
//         this.collectionLibro.updateOne({_id: libro._id},{$set: {prestito: false, reso: true}});
//         this.emit('reso', this.libro);
//     }
//     info()
//     {
//         this.emit('info', this.libro);
//     }
// }

class Libro
{
    constructor(titolo, autore, id)
    {
        // super();
        this._id = new ObjectId(id);
        this.titolo = titolo;
        this.autore = autore;
        this.prestito = false;
        this.reso = false;
    }

    dettagli()
    {
        console.log("Titolo:"+this.titolo+" Autore"+this.autore+" Prestito:"+this.prestito+" Reso:"+this.reso);
    }
    prestito()
    {
        this.prestito = true;
        this.reso = false;
    }
    reso()
    {
        this.reso = true;
        this.prestito = false;
    }
    
}

module.exports = { LibroCollection, Libro };