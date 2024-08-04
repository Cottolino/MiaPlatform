const express = require('express');
const app = express();

app.get('/blog/:anno/:mese', (req,res)=>{
    //Parametri query string non obbligatori! 
    console.log(req.query);
    //Parametri di rotta obbligatori!
    console.log(req.params);
      
    res.send('Log');
});

app.listen(3000);