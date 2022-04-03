const argumentos = process.argv.slice(2);
let operacion = argumentos[0].toLocaleLowerCase()
let num1=Number(argumentos[1])
let num2=Number(argumentos[2])

let resultado;
if (operacion == 'suma') {
  resultado = num1+num2
} else if (operacion == 'resta') {
  resultado = num1-num2
} else if (operacion == 'multiplicacion') {
  resultado = num1*num2
} else if (operacion == 'division'){
  resultado = num1/num2
} else {
  console.log('Operación no permitida');
  return
}
console.log(`La operacipn de ${operacion} entre ${num1} y ${num2} es ${resultado}`)