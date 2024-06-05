const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const dbURI = 'mongodb+srv://giuseppe2:db_123@maestro-node.kumsrrs.mongodb.net/?retryWrites=true&w=majority&appName=maestro-node';
const client = new MongoClient(dbURI);



const connect = async function () 
{
    await client.connect();
    console.log('Connected');
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

connect().catch((err) => console.log(err));

app.use(session({
    secret: 'miaChiaveSegreta123',
    resave: false,
    saveUninitialized: true,
    //secure: true: http -> https
    cookie: { secure: false },
    genid: () =>  uuidv4() ,
    store: MongoStore.create({ client: client, dbName: 'MiaLibri' })
  }));

// app.get('/',(req,res) => {
//     console.log(req.session.id);
//     req.session.colorePreferito = 'verde';
//     res.send();
// });

app.get('/login', (req,res) => {
    console.log(req.session.id);
    req.session.isLogged = true;
    res.send();
});

app.get('/logout', (req,res)=> {
    req.session.destroy((err) => console.log(err));
    res.send();
})

app.get('/rotta-2',(req,res) => {
    if(req.session.isLogged){
        res.send('Sei loggato');
    }
    else{
        res.send('Non sei loggato');
    }
});
