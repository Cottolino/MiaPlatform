const fs = require('fs');

fs.readFile('f2.txt', (err, data) =>{
    if(err)
        {
            return handleError(new Error(err));
        }
    console.log(err,data);
});

function handleError(errore)
{
    console.log('Errore Gestito');
}