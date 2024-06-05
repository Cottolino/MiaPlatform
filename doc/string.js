var string = new String("Hello, World!");

let len = string.length;
console.log(len);

let upper = string.toUpperCase();
console.log(upper);

let lower = string.toLowerCase();
console.log(lower);

let index = string.indexOf('World');
console.log(index);

let slice = string.slice(0, 5);
console.log(slice);

let replace = string.replace('World', 'Giuseppe');
console.log(replace);

let split = string.split(',');
console.log(split);

let charAt = string.charAt(0);
console.log(charAt);

let charCodeAt = string.charCodeAt(0);
console.log(charCodeAt);

let concat = string.concat(' Giuseppe');
console.log(concat);

let endsWith = string.endsWith('!');
console.log(endsWith);

let includes = string.includes('World');
console.log(includes);

let match = string.match(/World/);
console.log(match);

let repeat = string.repeat(2);
console.log(repeat);

let search = string.search('World');
console.log(search);

let startsWith = string.startsWith('Hello');
console.log(startsWith);

let substr = string.substr(0, 5);
console.log(substr);

let substring = string.substring(0, 5);
console.log(substring);

let trim = string.trim();
console.log(trim);

let valueOf = string.valueOf();
console.log(valueOf);

let padEnd = string.padEnd(15, '!');
console.log(padEnd);

let padStart = string.padStart(15, '!');
console.log(padStart);
