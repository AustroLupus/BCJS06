const express = require('express');
const moment = require('moment');
const axios = require('axios');
const uuid = require('uuid');
const chalk = require('chalk')

const app = express()
app.use(express.static('public'))

const usuarios = []
moment.locale('es-mx')

function get_cita () {
  const hoy = Date.now()
  const manana = hoy + 24*60*60*1000
  const dos_meses = manana*60

  const cita_mes = Math.random()*(dos_meses-manana) + manana;
  const cita = new Date(cita_mes)
  return cita.toString()
}
async function init(){
  	const { data } = await axios.get(`https://randomuser.me/api/?results=10`)
	data.results.map(user => {
		const nombre = user.name.first;
		const apellido = user.name.last;
		const registro = moment().format('LLL');
		const id = uuid.v4();
		const cita = get_cita();

		const nuevo_usuario = {
			nombre,
		    apellido,
		    registro,
		    id,
		    cita
		}
		usuarios.push(nuevo_usuario);
		console.log(chalk.bgWhite(chalk.blue(JSON.stringify(nuevo_usuario))))
	})
}
init();
app.get('/usuarios', (req, res) => {
	console.log({usuarios})
	res.json({usuarios})
})

app.listen(3000, () => console.log('Ejecutando en puerto 3000'));
