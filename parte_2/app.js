// const getMeteo = require('./meteo');
const Meteo = require('./meteo');
const meteoObj = new Meteo();

const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

// emit = sollevare
// on = gestire

meteoObj.on('meteo', (evtObj) => {
    console.log('evento meteo catturato!');
    console.log(evtObj);
});

// eventEmitter.emit('evento1', { infoEvento: 'Primo Evento'});


// Vogliamo EMETTERE SU meteo.js
// Vogliamo GESTIRE SU app.js

meteoObj.getMeteo();