const nodemailer = require('nodemailer');
const fs = require('fs');
const moment = require('moment');

moment.locale('es-mx')

let transporter = nodemailer.createTransport({
  pool: true,
  host: "mail.austrolupus.com",
  port: 465,
  secure: true,
  auth: {
    user: "nodemailer@austrolupus.com",
    pass: "unodostrescuatro",
  },
  tls:{
    rejectUnauthorized: false,
  }
});

const send = async (gasto) => {
  try {
    let ahora = moment().format('LLL')
    const roommiesJSON = await JSON.parse(
      fs.readFileSync('./private/roommates.json', 'utf8')
      );
      let correos = [];
      roommiesJSON.roommates.forEach((room) => {
        correos.push(room.correo);
      });
      
    let texto = `
      <h2>Registro de Gastos</h2>
      <p> Con fecha ${ahora} se ha registrado el siguiente gasto </p>
      <ul>
        <li>Nombre: ${gasto.roommates}</li>
        <li>Descripci&oacute;n: ${gasto.descripcion}</li>
        <li>Monto: $${gasto.monto}</li>
      </ul>
      <hr>
      <i>No responda a este correo, es un mensaje generado autom&aacute;ticamente
    `;

    return new Promise(async (resolve, reject) => {
      let mailOptions = {
        from: "nodemailer@austrolupus.com",
        to: ["nodemailer@austrolupus.com"].concat(correos),
        subject: "Nuevo gasto registrado",
        html: texto,
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = send;