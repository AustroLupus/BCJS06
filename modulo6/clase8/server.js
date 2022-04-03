const express = require("express");
const axios = require("axios");
const send_email = require("./email.js");
const fs = require("fs").promises;
const uuid = require("uuid");

const app = express();
const PORT = 3000
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/mailing', async (req, res) => {
    const correos = req.body.correos;
    const asunto = req.body.asunto;
    const id = `casilla/${uuid.v4()}.txt`;
    let texto = await texto_correo(req.body.contenido);
    send_email(correos, asunto, texto );
    await fs.writeFile(id,texto,'utf-8')
    res.send('Email enviado!')
})

async function cuerpo_correo(contenido){
	const { data } = await axios.get('https://mindicador.cl/api')
	const dolar = data.dolar.valor;
	const euro = data.euro.valor;
	const uf = data.uf.valor;
	const utm = data.utm.valor;
	const cuerpo = `${contenido}
	   El valor del dolar el dia de hoy es: ${dolar}<br>
	   El valor del euro el dia de hoy es: ${euro}<br>
	   El valor del UF el dia de hoy es: ${uf}<br>
	   El valor del UTM el dia de hoy es: ${utm}<br>`
	return cuerpo
}

app.listen(PORT, () => {
	console.log(`Servidor corriendo en puerto ${PORT}`)
});
