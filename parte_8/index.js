const url = require('url');
const { URL } = url;
const indirizzo = 'htttp://mi.com/user/?id=1&name=giuseppe';
const urlObj = new URL(indirizzo);
const parametri = urlObj.searchParams;

// console.log(urlObj);
// console.log(url.parse(indirizzo));
let iteratore = parametri.entries();
// console.log(parametri);
// console.log(iteratore);
// console.log(iteratore.next());
// console.log(iteratore.next());

// parametri.forEach((value, name) =>  {
//     console.log(name, value);
// });
parametri.set('cognome', 'rossi');

console.log(parametri.get('id'));
console.log(parametri.get('name'));
console.log(parametri.get('cognome'));

console.log(parametri.has('id'));
