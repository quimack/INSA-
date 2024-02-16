const nodemailer = require('nodemailer');
const emailjs = require('emailjs-com');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: 'diegorosso1988@gmail.com',
    pass: '_zenkicapo2097',
  },
});

function enviarCorreo(destinatario, asunto, mensaje) {
  const options = {
    from: 'developmentbug@gmail.com',
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
}

module.exports = { enviarCorreo };