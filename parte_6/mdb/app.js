const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

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
app.get('/articolo',async (req,res) => {
    // const articolo = await articoliCollection.findOne({titolo: 'Il mio primo articolo'});
    const cursor = articoliCollection.find({});
    console.log(await cursor.count());                                                                        
    await cursor.forEach(articolo => {
        console.log(articolo);
    });

    // for await(const articolo of cursor){
    //     console.log(articolo);
    // }

    // const articolo1 = await cursor.next();
    // console.log(articolo1);
    // const articolo2 = await cursor.next();
    // console.log(articolo2);
    
    // while(await cursor.hasNext()){
    //     const articolo = await cursor.next();
    //     console.log(articolo);
    // }

    // console.log(articolo);
    res.send();

});
//UPDATE
app.get('/modifica-articolo',async (req,res) => {
    // const update = {
    //     $set: {
    //         autore: 'Pinco Pallino'
    //     }
    // };
    // id = new ObjectId('665d74671ec5211e31cdb150');
    // const filter = {
    //     _id : id
    // };

    // const ris = await articoliCollection.updateOne(filter,update);
    // console.log(ris);
    // res.send();

    // articoliCollection.find({}).forEach(articolo => {
    //     let voto = Math.random() * 5;
    //     articoliCollection.updateOne({_id: articolo._id},{$set: {voto: +voto.toFixed(1)}});
    // });
    // res.send();

    const ris = await articoliCollection.updateMany({},{$inc: {voto: 0.5}});
    res.send();
});
//DELETE
app.get('/cancella-articolo',async (req,res) => {
    // id = new ObjectId('665d74671ec5211e31cdb150');
    // const ris = await articoliCollection.deleteOne({_id: id});
    // console.log(ris);
    // res.send();

    const filter = {
        voto: {
            $gte: 4
        }
    };
    const ris = await articoliCollection.deleteMany(filter);
    console.log(ris);
    res.send();
});

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
