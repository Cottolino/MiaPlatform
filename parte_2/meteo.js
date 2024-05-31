const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();


//Posso accedere a tutti i metodo di EventEmitter
class Meteo extends EventEmitter {
    constructor() {
        super();
    }

    async getMeteo() {
        //Supponiamo di fare una chiamata API
        //Per ora passo solo un oggetto {condizioni: 'Sole', temperatura: 23}

        //Promise.resolve() è una funzione che restituisce una Promise 
        //Utilizziamo await/then (solo nelle funzioni ASINCRONE)
        const meteoInfo = await Promise.resolve({condizioni: 'Sole', temperatura: 23});

        //Qunando le info sono pronte emetto l'evento
        this.emit('meteo', meteoInfo);
    }
}



module.exports = Meteo;