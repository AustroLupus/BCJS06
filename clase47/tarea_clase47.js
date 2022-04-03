const fs = require('fs').promises;
const readline = require('readline')

const lista = ['papas ', ' \nlechuga ', ' \ntomates ', ' \nleche ', ' \nhuevos ', ' \nmantequilla ']

const rl = readline.createInterface(
    { input: process.stdin, output:process.stdout }
  );

async function inicia() {
    await fs.writeFile('shopping.txt', lista, 'utf-8')
    setTimeout(inicia2, 2000);
}

async function inicia2() {
    const datos = fs.readFile('shopping.txt', 'utf-8');
    console.log('lista de compras :' + datos);
    setTimeout(inicia3, 2000);
}
async function inicia3() {
    fs.rename('shopping.txt', 'miListaDeCompras.txt')
    setTimeout(inicia4, 2000);
}
async function inicia4() {
    fs.unlink('miListaDeCompras.txt');
}

function preguntar () {
    rl.question('¿Que acción desea ejecutar?\n~ ', async function(resp) {
      console.log('El usuario eligió ' + resp)
  
      if (resp == 'NADA') {
        return rl.close()
      }
      // Acá leemos, escribimos, agregamos, etc ...
      preguntar()
    })
  }

inicia()
    //bonus
const valor = process.argv[2]
const nombre_archivo = process.argv[3]


switch (valor) {
    case 'crear':
        return crear();
    case 'agregar':
        return agregar();
    case 'renombrar':
        return renombrar();
    case 'eliminar':
        return eliminar();
    default:
        return 'debes ingresar un dato valido'
}
async function crear() {
    await fs.writeFile(nombre_archivo, lista, 'utf-8')
}

async function agregar() {
    let datos = await fs.readFile(nombre_archivo, 'utf-8');
    const producto = process.argv[4]
    datos += `\n${producto}`;
    console.log('lista de compras :' + datos);
    await fs.writeFile(nombre_archivo, datos, 'utf-8')
}
async function renombrar() {
    const valor3 = process.argv[4]
    await fs.rename(nombre_archivo, valor3)
}
async function eliminar() {
    await fs.unlink(nombre_archivo);
}

