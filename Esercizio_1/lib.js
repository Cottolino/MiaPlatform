const { EventEmitter } = require('events');

class Lib extends EventEmitter {
    
    ListLib = [
        { nome: 'lib1', versione: '1.0.0', autore: 'Giuseppe' },
        { nome: 'lib2', versione: '1.0.0', autore: 'Rita' },
    ];

    constructor() {
        super();
    }

    //Metodo che emette l'evento
    get() {
        this.emit('listLib', this.ListLib);
    }
}

module.exports = Lib;