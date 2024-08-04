const exp = require('constants');
const express = require('express');
//npm i response-time
const responseTime = require('response-time');
//npm i morgan
const morgan = require('morgan');

const app = express();
const path = require('path');

// Accetta in ingresso JSON
// curl -d '{"nome":"Sara"}' -H "Content-Type: application/json" -X POST localhost:3000
// app.use(express.json());

// Accetta in ingresso TEXT
// curl -d 'Testo' -H "Content-Type: text/plain" -X POST localhost:3000
// app.use(express.text());

// app.post('/',(req,res)=>{
//     console.log(req.body);
//     res.send();
// });

// http://localhost:3000/img/sfondo.jpg
// app.use(express.static('public'));

// http://localhost:3000/assets/img/sfondo.jpg
// Crea una cartella virtuale con file statici
// app.use('/assets',express.static('public'));

// path fa la join di 2 stringhe [PATH ASSOLUTO]
// app.use(express.static(path.join(__dirname,'public')));

// Aggiunge header response Time
app.use(responseTime());
// Info GET / 200 - - 1.087 ms
app.use(morgan('tiny'));

app.get('/',(req,res) => {
    res.send();
});

app.listen(3000);