const express = require('express');
const app = express();

app.disable('x-powered-by');

app.get('/', (req, res) => {
    console.log('Nuova richiesta GET alla rotta /');
    res.send('Ciao, mondo!');
});

app.post('/', (req, res) => {
    console.log('Nuova richiesta POST alla rotta /');
    res.send('Ciao, mondo!');
});
app.get(['/blog','/blog2'], (req, res) => {
    console.log('Nuova richiesta GET alla rotta /blog');
    res.send('<h1>Benvenuto nel blog</h1>');
});
app.all('/api/*', (req, res) => {
    const isLogged = false;
    if(!isLogged)
    {
        res.status(401).send('Non sei autorizzato');
        return;    
    }
});

app.get('/admin[0-6]{2,}',(req, res)=>{
    res.status(200).send('Sei un admin');
});

app.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000...');
});