// importar las dpeendencias
const fs = require('fs').promises
const child_process = require('child_process')
const axios = require('axios')

console.log('Procesando Solicitud');
/**
 * 1. Validar las entradas de process.argv
 * 2. Realizar consulta a la API
 * 3. Crear el archivo
 * 4. Ejecutar con child_process 
 */

async function init() {
  if (process.argv.length < 6) {
    console.log('Faltan argumentos para ejecutar');
    return
  }
  const nombre_archivo = process.argv[2]
  const extension = process.argv[3]
  const divisa = process.argv[4]
  let pesos = process.argv[5]
  
  if(divisa !=  'dolar' && divisa != 'euro' && divisa !='utm' && divisa != 'uf' && divisa != 'bitcoin' ){
    console.log('divisa no soportada')
    return
  }
  if(isNaN(pesos)){
    console.log('La cantidad debe ser un numero entero')
    return
  }
  pesos = Number(pesos)
  if(pesos <1000){
    console.log('La cantidad debe ser superior a 1000')
    return
  }
  if(extension !=  'txt' && extension != 'csv' && extension !='js'){
    console.log('Las extensiones soportadas son txt, csv o js')
    return
  }

  const fechaActual = Date.now();
  const horaConsulta = new Date(fechaActual);
 
  const {data} = await axios.get('https://mindicador.cl/api/')
  let resultado = (pesos/(data[divisa].valor)).toFixed(2)
  cotizacion = 'A la fecha: '+horaConsulta.toString()+'\nFue realizada cotización con los siguientes datos:\nCantidad de pesos a convertir: '+pesos+' pesos\nConvertido a "'+divisa+'" da un total de:\n$'+resultado+'.-';

const nombreArchivo = nombre_archivo+'.'+extension
await fs.writeFile(nombreArchivo, cotizacion, 'utf-8')
child_process.exec('cat '+nombreArchivo, function (err1, result1) {
      console.log(result1);
  })
  
}
 init()
