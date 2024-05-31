// (function(exports, require, module, __filename, __dirname){
//     //codice modulo

// })


// console.log(__filename);
// console.log(__dirname);
// console.log(module);

// const fs = require('fs');
// console.log(fs);
// const os = require('os');
// console.log(os.tmpdir());
// console.log(os.arch());
// console.log(os.platform());
// fs.mkdirSync('src');
// fs.appendFileSync('note.txt', 'Hello World!');

const validator = require('validator');

// console.log(validator);
const check = validator.isEmail('gianluca@emai.it');
console.log(check);

const cleanStr = validator.blacklist('abc<img>', '<>');
console.log(cleanStr);
