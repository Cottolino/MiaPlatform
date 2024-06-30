function fattoriale (n) {
	//base
  if(n == 0)
    return 1
  var cont = 1;
  var risultato = 1;
  while(cont < n )
  {
    	risultato *= risultato +1;
    	cont++;
  }
  return risultato;
}

function fattorialeRic(n)
{
  	if (n == 0)
  	return 1;
  
  	return n * fattorialeRic(n-1);
}

// const a = fattoriale(4);
// console.log(a);
const b = fattorialeRic(5);
console.log(b);
