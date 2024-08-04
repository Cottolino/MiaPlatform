//Middleware
const express = require('express');
const app = express();

app.get('/mid', prima,seconda);

function prima(req,res,next)
{
    console.log('Nuova richiesta ricevuta 1');
    next();
}
function seconda(req,res)
{
    console.log('Nuova richiesta ricevuta 2');
    res.send('Ok');
}


app.get('/',(req,res,next) => {
    console.log('Nuova richiesta ricevuta 1');
    next();
});

app.get('/',(req,res) => {
    console.log('Nuova richiesta ricevuta 2');
    res.send('Ok');
});

// app.use(checkAuthentication);
// app.use(checkAuthorization);

// Applica a tutte le richieste /user
app.use('/user',checkAuthentication,checkAuthorization);

app.get('/contatti', (req,res) => {
    res.send('Contatti');
});

app.get('/user/risorsa-1', (req,res) => {
    res.send('Ecco la risorsa premium...');
});
app.get('/user/risorsa-2', (req,res) => {
    res.send('Ecco la risorsa premium...');
});
app.get('/user/risorsa-3', checkAuthentication,checkAuthorization,(req,res) => {
    res.send('Ecco la risorsa premium...');
});
//Controllo Autenticazione
function checkAuthentication(req,res,next)
{
    const isLogged = false;
    if(!isLogged)
    {
        return res.status(401).send('Non sei autenticato');
    }
    //Modifico req per passare parametri tra le middleware
    req.user = { nome: 'Giuseppe' , tipo: 'Standard' };
    next();
}

//Controllo Autorizzazione
function checkAuthorization(req,res,next)
{
    const isAutorizzato = req.user.tipo === 'Premium' ?true:false;
    if(!isAutorizzato) return res.status(403).send('Non sei autorizzato');
    next();
}

app.listen(3000,()=> console.log('Server listen in 3000'));