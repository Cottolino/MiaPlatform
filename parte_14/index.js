const express = require('express');
const app = express();

//Setto variabile Express
app.set('nomeApp', 'Prima app Express');

// app.set('case sensitive routing', true);
app.enable('case sensitive routing');

console.log(app.get('nomeApp'));

app.listen(3000, () => {   
});
