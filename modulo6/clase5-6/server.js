const express = require('express');
const jimp = require('jimp');
const axios = require('axios');
const moment = require('moment');
const chalk = require('chalk')


const app = express();
moment.locale('es-mx')
app.use(express.static(__dirname + '/public'))
const imagenURL="public/newImg.jpg"
const PORT = 3000
const fecha=moment().format('LL')

app.get('/url', async (req, res) => {
    let img;
    const url = req.query.url;
    let lat = req.query.lat;
    let lon = req.query.long;
    let numeroRandom = Math.floor(Math.random()*80);
    const { data } = await axios.get(`https://anapioficeandfire.com/api/houses/${numeroRandom}`);
    const inspiracional = data.coatOfArms;
    const font = await jimp.loadFont(jimp.FONT_SANS_12_BLACK);
    console.log(`${lat} y ${lon}`);
    console.log(inspiracional);
    console.log(numeroRandom);
    try {
        img = await jimp.read(url)
    } catch (error) {
        console.log(error)
        return res.send('Imagen no se pudo abrir')
    }

    img.greyscale()
    img.quality(60)
    img.resize(350,jimp.AUTO)
    await img.print(font, 10, 10, inspiracional, 330)
    await img.writeAsync(imagenURL)
    res.redirect('/newImg.jpg')
});
app.get('/favicon.ico', (req,res)=>{
    res.redirect('/favicon.ico')
})

  
    
app.listen(PORT, () => {
    console.log(chalk.bgGreen(chalk.black(`${moment().format()}: Servidor iniciado en el puerto ${PORT}`)));
});

