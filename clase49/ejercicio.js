const express = require('express')
const moment = require('moment')
moment.locale("es")
const app = express()
const hora = moment()

app.get('/', (req,res) =>{
    res.send(`
    <html>
        <head>
            <title> Practicando </title>
        </head>
        <body>
            <h2>Mi titulo!</h2>
        </body>
    </html>
    `)
})
app.get('/hora', (req,res) =>{
    
    paraMostrar = hora.format('LL')
    res.send(`
        <p> la fecha es ${paraMostrar} </p>
    `)
})
app.get('/nosotros', (req,res) =>{
    res.send(`
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
    `)
})
app.get('*', (req,res) =>{
    res.send(`
        Pagina no encontrada
    `)
})
const PORT = 3001
app.listen(PORT)
console.log(`Servidor andando en puerto ${PORT}`);