const nodemailer = require("nodemailer");

const transp = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mbensan.test@gmail.com",
    pass: "mbensan.2022",
  },
});

function send(receivers, subjet, html) {
  const options = {
    from: "mbensan.test@gmail.com",
    to: receivers,
    subjet,
    html,
  };

  transp.sendMail(options, () => {
    console.log("Email enviado");
  });
}
module.exports = send;
