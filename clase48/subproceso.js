// primero importamos las dependencias
const child_process = require('child_process');

// Método auxiliar para usar child_process como promesas
function ejecutar (nombre) {
  return new Promise((resolve, reject) => {
    child_process.exec(nombre, function (err, result) {
      resolve(result)
    })
  })
}

// Ejemplo de child_process sin promesas
const operacion = process.argv[2].toLowerCase()

child_process.exec('node uno.js', function (err, result1) {
  console.log('El resultado de uno.js es ' + result1)
  child_process.exec('node dos.js', function (err2, result2) {
    console.log('El resultado de dos.js es ' + result2)

    let resultado;
    if (operacion == 'suma') {
      resultado = parseInt(result1) + parseInt(result2)
    } else if (operacion == 'resta') {
      resultado = parseInt(result1) - parseInt(result2)
    } else if (operacion == 'multiplicacion') {
      resultado = parseInt(result1) * parseInt(result2)
    } else if (operacion == 'division'){
      resultado = parseInt(result1) / parseInt(result2)
    } else {
      console.log('Operación no permitida');
      return
    }

    console.log(`La ${operacion} de ambos es ${resultado}`);
  })
})