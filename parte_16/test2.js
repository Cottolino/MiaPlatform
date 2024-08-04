const express = require('express');
const res = require('express/lib/response');
const app = express();
const helmet = require('helmet');

// Aggiunge Header per Sicurezza
app.use(helmet());

app.get('/',(req,res)=> {
    res.send('Hello World');
});
app.listen(3000);