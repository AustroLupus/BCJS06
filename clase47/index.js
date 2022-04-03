/* const fs = require('fs')

 function ejecutar () {
    fs.writeFile('ejemplo.txt','Hola desde node JS','utf-8',function (){
        console.log('Funciono el write')
        fs.readFile('ejemplo.txt','utf-8',function(error,datos){
            console.log('el contenido del archovo es '+datos);
        })
    })
}
 */

const fs = require('fs').promises

async function ejecutar () {
    await fs.writeFile('ejemplo.txt','Hola desde node JS','utf-8')
        
    const datos = await fs.readFile('ejemplo.txt','utf-8',)
    
    console.log('Los datos leidos son '+ datos);
}

ejecutar()