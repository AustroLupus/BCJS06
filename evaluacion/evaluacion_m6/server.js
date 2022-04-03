const express = require('express');
const fs = require('fs');
const {nuevoRoomie} = require('./roommates');
const {nuevoGasto}= require('./gastos');
const {actualizarGastoRoomie}= require('./gastos');
const {eliminarGasto}= require('./gastos');
const {gastoActualizar}= require('./gastos');

  

const app = express();
const PORT = 3000;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,resp) =>{
    console.log(`Codigo de estado solicitud GET /: ${resp.statusCode}`);
    resp.send('/index.html')
});

app.get('/roommates', async (req, resp)=>{
    console.log(`Codigo de estado solicitud GET /roommates: ${resp.statusCode}`);
    let data = await fs.readFileSync('./private/roommates.json','utf-8') 
    resp.send(data)
});

app.post('/roommates', async (req, resp)=>{
    console.log(`Codigo de estado solicitud POST /roommate: ${resp.statusCode}`);
      await nuevoRoomie(resp);
      await actualizarGastoRoomie();
});

app.get('/gastos', async (req,resp) =>{
    console.log(`Codigo de estado solicitud GET /gastos: ${resp.statusCode}`);
    let data=await fs.readFileSync('./private/gastos.json','utf-8')
    resp.send(data)
});

app.post('/gastos', async (req,resp) =>{
    console.log(`Codigo de estado solicitud POST /gasto: ${resp.statusCode}`);
    await nuevoGasto(req,resp).then((gasto) => {
        resp.json(gasto)
    })
});

app.put('/gastos', async(req,resp)=>{
    console.log(`Codigo de estado solicitud PUT /gasto: ${resp.statusCode}`);
    await gastoActualizar(req,resp)
});

app.delete('/gastos', async (req,resp)=>{
    console.log(`Codigo de estado solicitud DELETE /gastos: ${resp.statusCode}`);
    const idCosto = req.query.id
    await eliminarGasto(idCosto,resp)
})

app.get('/favicon.ico', (req, resp)=>{
    console.log(`Codigo de estado solicitud del favicon: ${resp.statusCode}`);
    resp.send('/favicon.ico')
});

app.get('*', (req, resp) =>{
    resp.send('P&aacute;gina no encontrada')
});

app.listen(PORT,() => {
    console.log(`Servidor corriendo NodeJS en puerto ${PORT}`);
});

