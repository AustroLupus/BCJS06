const uuid = require('uuid');
const fs = require('fs');
const {actualizarRoomie} = require('./roommates');
const send = require('./email');


const nuevoGasto = async (req, res) => {
  // Función crear nuevo gasto
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const gasto = JSON.parse(body);
    gasto.id = uuid.v4();
    guardarGasto(gasto, res); // Guardar gasto
    send(gasto); // enviar correos
  });
};

const guardarGasto = async (gasto, res) => {
  // Función guardar gastos
  try {
    const gastosJSON = await JSON.parse(
      fs.readFileSync("./private/gastos.json", "utf8")
    );
    gastosJSON.gastos.push(gasto);
    fs.writeFile("./private/gastos.json", JSON.stringify(gastosJSON), (err) => {
      err
        ? console.log("No se pudo agregar el gasto")
        : console.log("Gasto Actualizado");
      res.end("Gasto actualizado con éxito");
    });
    actualizarRoomie(gasto); // Actualizar gastos del roommate
  } catch (err) {
    console.log(err);
  }
};

const actualizarGasto = async (gastos, res) => {
  // Actualizar gastos
  try {
    fs.writeFile("./private/gastos.json", JSON.stringify(gastos), (err) => {
      if (err) console.log("No se pudo agregar el gasto");
      else {
        console.log("Gasto Actualizado");
        actualizarGastoRoomie(); // Actulizar gastos del roommie
        res.end();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const eliminarGasto = async (id, res) => {
  // Eliminar gasto
  try {
    const gastosJSON = await JSON.parse(
      fs.readFileSync("./private/gastos.json", "utf8")
    );

    let gastoUpdate = {};
    gastoUpdate.gastos = gastosJSON.gastos.filter((gasto) => {
      if (gasto.id != id) return gasto;
    });
    actualizarGasto(gastoUpdate, res); // Actualizar gastos
  } catch (err) {
    console.log(err);
  }
};

const actualizarGastoRoomie = async () => {
  // Actulizar los gastos de los roommates
  try {
    const gastosJSON = await JSON.parse(
      fs.readFileSync("./private/gastos.json", "utf8")
    );
    const roommiesJSON = await JSON.parse(
      fs.readFileSync("./private/roommates.json", "utf8")
    );

    let gastos = [];
    let cantRoomies = roommiesJSON.roommates.length;
    gastos = gastosJSON.gastos.map((room) => {
      return {
        id: room.idroommie,
        monto: Math.round(room.monto/cantRoomies),
      };
    });

    let roommies = {};
    roommies.roommates = roommiesJSON.roommates.map((room) => {
      room.recibe = 0;
      room.debe = 0;
      gastos.forEach((gasto) => {
        if (gasto.id === room.id) room.recibe += gasto.monto;
        else room.debe += gasto.monto;
      });
      return room;
    });
    fs.writeFileSync("./private/roommates.json", JSON.stringify(roommies));
  } catch (err) {
    console.log(err);
  }
};

const gastoActualizar = async (req, res) => {
  let body = "";
  const idCosto = req.query.id;
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const nuevoGasto = JSON.parse(body);
    const idroommie = nuevoGasto.idroommie;
    const room = nuevoGasto.roommate;
    const desc = nuevoGasto.descripcion;
    const monto = nuevoGasto.monto;
    const gastosJSON = await JSON.parse(
      fs.readFileSync("./private/gastos.json", "utf8")
    );
    let gastoUpdate = {};
    gastoUpdate.gastos = gastosJSON.gastos.map((gasto) => {
      if (gasto.id === idCosto) {
        gasto.idroommie = idroommie;
        gasto.roommate = room;
        gasto.descripcion = desc;
        gasto.monto = monto;
      }
      return gasto;
    });
    actualizarGasto(gastoUpdate, res); // Actualizar gastos
  });
};

module.exports = {nuevoGasto,actualizarGastoRoomie,eliminarGasto,actualizarGasto,guardarGasto,gastoActualizar};
