const fs = require('fs');
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

fs.readFile('f2.txt', (err, data) =>{
    if(err)
        {
            return eventEmitter.emit('error', err);
        }
    console.log(err,data);
});

eventEmitter.on('error', (err) => {
    console.log(err);
});