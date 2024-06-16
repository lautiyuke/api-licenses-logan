let resultado = eval('3*3');
console.log(resultado);

eval('global.exponente = function(num1, num2) { return num1 ** num2; };');
console.log(exponente(2, 8));
