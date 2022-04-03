/**
 * Este es un programa interactivo para crear una lista de compras
 */
//dependencias
const fs = require('fs').promises;
const readline = require('readline')

//configuraciones inicales
const rl = readline.createInterface(
    { input: process.stdin, output:process.stdout }
);
const nombre_archivo='listas/' + process.argv[2]

function preguntar () {
    rl.question('¿Que desea agregar a lista?\n~ ', async function(resp) {
        resp=resp.toLocaleLowerCase()    
    if (resp == 'NADA') {
        console.log('Lista terminada')
        return rl.close()
    }
        // Acá leemos, escribimos, agregamos, etc ...
        let contenido = await fs.readFile(nombre_archivo,'utf-8')
        contenido = `${contenido}\n${resp}`
        await fs.writeFile(nombre_archivo,contenido,'utf-8')
        preguntar()
    })
}
async function iniciar () {
    await fs.writeFile(nombre_archivo,'utf-8')
    preguntar()
}
