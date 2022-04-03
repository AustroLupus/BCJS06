const axios = require('axios');
const uuid = require('uuid');
const fs = require('fs');

const nuevoRoomie = async (res) => {
  // Crear nuevo roommate
  let newUsuario = {};
  await axios
    .get("https://randomuser.me/api/") // Llamado a api
    .catch((err) => console.log(err))
    .then((datos) => {
      const data = datos.data.results;
      newUsuario = {
        id: uuid.v4(),
        correo: data[0].email,
        nombre: `${data[0].name.first} ${data[0].name.last}`,
        debe: 0,
        recibe: 0,
      };
      return newUsuario;
    })
    .then(async (roomie) => {
      await guardarRoomie(roomie);
      res.end(JSON.stringify(roomie));
    })
    .catch((err) => {
      console.log(err);
    });
};

const guardarRoomie = async (roomie) => {
  try {
    const roommiesJSON = await JSON.parse(
      fs.readFileSync("./private/roommates.json", "utf8")
    );
    roommiesJSON.roommates.push(roomie);
    fs.writeFileSync("./private/roommates.json", JSON.stringify(roommiesJSON));
  } catch (err) {
    console.log(err);
  }
};

const actualizarRoomie = async (gasto) => {
  try {
    const roommiesJSON = await JSON.parse(
      fs.readFileSync("./private/roommates.json", "utf8")
    );
    let roommies = {};
    let cantRoomies = roommiesJSON.roommates.length;
    let pago = Math.round(gasto.monto/cantRoomies);
    roommies.roommates = roommiesJSON.roommates.map((room) => {
      if (room.id == gasto.idroommie) room.recibe += pago;
      else room.debe += pago;
      return room;
    });
    fs.writeFileSync("./private/roommates.json", JSON.stringify(roommies));
  } catch (err) {
      console.log(err);
  }
};

module.exports = {nuevoRoomie, actualizarRoomie, guardarRoomie};
