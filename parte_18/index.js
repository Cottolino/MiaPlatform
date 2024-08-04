const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {verifyToken,signToken,deleteToken} = require('./middleware/user-auth');
require('dotenv').config();

//Invio Richieta GET => req
//Ricevo Risposta => res

const app = express();
app.use(cookieParser());

//Chiamata al server per il login
app.get('/login', signToken, (req, res) => {
    res.send();
});




//Funzione Sincrona => TRY CATCH
//Chiama il server per ottenere il profilo dell'utente
app.get('/user/profile', verifyToken, (req,res)=>{
    console.log(req.user);
    res.send('Sei Autenticato');
})

app.get('/user/message', verifyToken, (req, res) => {
    res.send('Messaggio Segreto');
});

app.get('/user/logout', deleteToken, (req, res) => {
    res.send('Logout Effettuato');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


