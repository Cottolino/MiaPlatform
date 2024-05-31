const Lib = require('./lib');
const libObj = new Lib();

libObj.on('listLib', (evtObj) => {
    console.log('evento listLib catturato!');
    console.log(evtObj);
});

libObj.get();