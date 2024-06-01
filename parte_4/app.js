const events = require('events');
const { EventEmitter } = require('stream');
const evenEmitter = new events.EventEmitter();

function handlerFn() {
    console.log('Evento catturato!');
}

function handlerFn2() {
    console.log('Evento catturato da HandlerFn2!');
}

//Una volta emesso viene rimosso il listener!
evenEmitter.once('meteo', handlerFn);
evenEmitter.on('meteo', handlerFn2);

//Stampa un array con i nomi degli eventi registrati
console.log(evenEmitter.eventNames());

evenEmitter.emit('meteo');

//Stampa un array con i nomi degli eventi registrati
console.log(evenEmitter.eventNames());
evenEmitter.emit('meteo');

//Rimuovo il listener
EvenEmitter.removeListener('meteo', handlerFn);