var array = new Array();

array.push('MiaPlatform');
console.log(array);

array.length;
console.log(array.length);

array.pop();
console.log(array);

array.forEach(element => {
    console.log(element);
}); 

array.unshift('MiaPlatform');
console.log(array);

array.shift();
console.log(array);

//Aggiunge o Rimuove elementi da un array
//(index,count,element1,element2,...)
//index=index di partenza da cui iniziare a rimuovere o aggiungere elementi
//count=numero di elementi da rimuovere
//element1,element2,...=elementi da aggiungere all'array 
array.splice(0, 0, 'MiaPlatform');
console.log(array);

//Joina tutti gli elementi di un array in una stringa
array.join("*");

//Converte in stringa un array
array.toString();

//Ritorna l'elemento in posizione index
array.at(0);

//Rimuove l'ultimo elemento di un array
array.pop();

//Concatena due array
array.concat([1,2,3]);

//Elimina il primo elemento dell'array
delete array[0];

//Trasforma la matrice in un array
array.flat();

//Rirtorna un array dal secondo elemento in poi
array.slice(2);

//Ritorna il valore
array.find(element => element == 'MiaPlatform');

array.indexOf('MiaPlatform');
