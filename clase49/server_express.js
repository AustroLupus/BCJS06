//import express from 'express'
const express = require('express')

const app = express()

//app.get(ruta,callback)
app.get('/', (req,res) =>{
    res.send('Esta es nuesta app')
})

app.get('/contacto',(req,res)=>{
    res.send(`
    <form>
    <label> Coloque su mail aqui</label>
    <input type="email">
    <input type="submit">
    </form>
    `)
})

app.get('/nosotros', (req,res) =>{
    res.send('Sobre nosotros')
})

const PORT = 3001
app.listen(PORT)
console.log(`Servidor andando en puerto ${PORT}`);