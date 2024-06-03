const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const dbURI = 'mongodb+srv://giuseppe2:db_123@maestro-node.kumsrrs.mongodb.net/?retryWrites=true&w=majority&appName=maestro-node';
const client = new MongoClient(dbURI);
let blogDB;
let articoliCollection;

//CREATE
app.get('/nuovo-articolo',async (req,res) => {

    const articoli = [
            {
                titolo: 'Il mio primo articolo',
                testo: 'Questo è il testo del mio primo articolo',
                autore: '1',
                tag: [
                    "node.js",
                    "javascript",
                    "mongodb"
                ]
            },
            {
                titolo: 'Il mio secondo articolo',
                testo: 'Questo è il testo del mio secondo articolo',
                autore: '2',
                tag: [
                    "node.js",
                    "javascript",
                    "mongodb"
                ]
            },
            {
                titolo: 'Il mio terzo articolo',
                testo: 'Questo è il testo del mio terzo articolo',
                autore: '3',
                tag: [
                    "node.js",
                    "javascript",
                    "mongodb"
                ]
            }
    ];

    const ris1 = await articoliCollection.insertMany(articoli);
    console.log(ris1);

    const articolo = {
        titolo: 'Il mio primo articolo',
        testo: 'Questo è il testo del mio primo articolo',
        autore: 'Giuseppe',
        tag: [
            "node.js",
            "javascript",
            "mongodb"
        ]
    };

    // const ris = await articoliCollection.insertOne(articolo);
    // console.log(ris);   

    // if(ris.acknowledged == true){
    //     res.send('Articolo inserito correttamente');
    // }
    if(ris1.acknowledged == true){
        res.send('Articoli inserito correttamente');
    }
    

});
//READ
app.get('/articolo',(req,res) => {});
//UPDATE
app.get('/modifica-articolo',(req,res) => {});
//DELETE
app.get('/cancella-articolo',(req,res) => {});



async function run() {
    await client.connect();
    console.log('Connessione al database MongoDbAtlas riuscita');
    app.listen(3000, () => {
        console.log('Server in ascolto sulla porta 3000');
    });
    //seleziono il database
    blogDB = client.db('blog');
    //seleziono la collection
    articoliCollection = blogDB.collection('articoli');
}

run().catch(err => console.log('ErroreConnessione'+ err));
