const fs = require('fs');


//Passando come secondo parametro 'utf8' la funzione readFile restituirà una stringa!
//Oppure { encoding: 'utf8' }
fs.readFile('f1.txt', (err, dati)=>{
    if(err) throw err;

    //Stampa un tipo Buffer
    console.log(dati);

    //Stampa la stringa
    console.log(dati.toString());
})



//Trasformare Esadecimale in Decimale
var dec = parseInt('63',16);
console.log(dec);

//Traformare Decimale in Carattere(1byte)
var car = String.fromCodePoint(dec);
console.log(car);