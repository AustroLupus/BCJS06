const express = require('express');
const fs = require('fs').promises;
const moment = require('moment');


const app = express();
app.use(express.static('public'));
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
moment.locale('es-mx');

app.get('/dos', (req, res) => {
    res.send('pagina secundaria')
})

const paraArchivo = []
app.post('/crea-archivo', async (req, res) => {
	const nombre = `files/${req.query.nomArchRenom}.txt`;
	let fecha = moment().format('L');
	const contenido = `${fecha}<br>\n${req.query.contenido}`
	await fs.writeFile(nombre, contenido, 'utf-8');
	res.send(`archivo creado con exito! el:' + moment().format('L')`);
})
      

app.get('/lee-archivo', async(req, res) => {
    const nombre = `files/${req.query.leerArchivo}.txt`;

    try {
        const datos = await fs.readFile(nombre)
        return res.send(`'contenido archivo: \n'${datos}`)
    } catch (error) {
        if (error.code = 'ENOENT') {
            return res.send('archivo inexistente')
        }
    }

})

app.get('/renombrar-archivo', async(req, res) => {
    const nombre = `files/${req.query.nomArchRenom}.txt`;
    const nuevoNombre = `files/${req.query.nomArchNuevo}.txt`;
    try {
        await fs.readFile(nombre)
    } catch (error) {
        if (error.code = 'ENOENT') {
            return res.send('archivo inexistente')
        }
    }
    await fs.rename(nombre, nuevoNombre)
    res.send('se a renombrado su archivo')
})

app.get('/elimina-archivo', async(req, res) => {
    const nombre = `files/${req.query.matarArchivo}.txt`;
    try {
        await fs.readFile(nombre)
    } catch (error) {
        if (error.code = 'ENOENT') {
            return res.send('archivo inexistente')
        }
    }
    setTimeout(async ()=>{
		await fs.unlink(nombre)
    		res.send('eliminado con exito')
	},3000)
 
})
app.get('/eliminado', async(req, res) => {
  
})

app.get('*', (req, res) => {
    res.send('pagina no encontrada')
})

app.listen(3000, function() {
    console.log('sevidor ejecutando desde expressjs en puerto 3000');
})
