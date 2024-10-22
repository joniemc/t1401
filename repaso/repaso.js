var numero = 400;
var numero2 = 23;

function suma(a,b){
    return a+b;
}

function resta(a,b){
    return a-b;
}

var count = 0; 
function ContarValoresMayoresACero(a){
       
    if(a>0){
        count++;
    }

    return count;
}


console.log(ContarValoresMayoresACero(numero));
console.log(ContarValoresMayoresACero(numero));
console.log(ContarValoresMayoresACero(numero));
console.log(ContarValoresMayoresACero(numero));