const events = require('events');
const eventEmitter = new events.EventEmitter();

//Posso evocare 2 listerner differenti per lo stesso evento
//Magari per fare 2 servizi diversi
eventEmitter.on('meteo', function(){
    console.log('Primo Evento meteo catturato!');
});
eventEmitter.on('meteo', function(){
    console.log('Secondo Evento meteo catturato!');
});

eventEmitter.emit('meteo');
