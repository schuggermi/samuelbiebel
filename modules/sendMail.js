const nodemailer = require("nodemailer");
const mailGun  = require("nodemailer-mailgun-transport");

function sendMail(recepient, firstName, lastName, email, message, dsgvo) {
  let smtpTransporter = nodemailer.createTransport({
    host: "w01c9dbe.kasserver.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    tls:{
    ciphers:'TLSv1.2',
      rejectUnauthorized: false
    },
    // SSLv3
    auth: {
      user: "m0605ee7", // generated ethereal user
      pass: "*Samu2022!biebel" // generated ethereal password
    }
  });

  let adminMail = '<div style="width: 100%; height: 100%; font-size: 1.2rem; position: relative;">' +
          '<img style="width: 100px; position: absolute; top: 5px; left: 5px;" src="cid:logo.@ruepel-transparent.2022.de">' +
          '<h1 style="position: absolute; top: 85px; left: 5px;">Eine neue Nachricht über das Kontaktformular</h1><br><br>' +
          '<hr style="position: absolute; top: 140px; left: 5px; width: 100%; background-color: rgba(0, 0, 0, 0.8); border: 0.1rem solid rgba(0, 0, 0, 0.8);">' +
          '<ul style="list-style: none; position: absolute; top: 150px; left: 5px;">' +
            '<li>Vorname: ' + firstName + '</li>' +
            '<li>Nachname: ' + lastName + '</li>' +
            '<li>E-Mail: ' + email + '</li>' +
            '<li>Nachricht: ' + message + '</li>' +
          '</ul>' +
        '</div>';

  let clientMail = '<div style="width: 100%; height: 100%; font-size: 1.2rem; position: relative;">' +
          '<img style="width: 100px; position: absolute; top: 5px; left: 5px;" src="cid:logo.@ruepel-transparent.2022.de">' +
          '<h1 style="position: absolute; top: 85px; left: 5px;">Deine Nachricht an Samuel Biebel wurde gesendet.</h1><br><br>' +
          '<hr style="position: absolute; top: 140px; left: 5px; width: 100%; background-color: rgba(0, 0, 0, 0.8); border: 0.1rem solid rgba(0, 0, 0, 0.8);">' +
          '<ul style="list-style: none; position: absolute; top: 150px; left: 5px;">' +
            '<li>Vorname: ' + firstName + '</li>' +
            '<li>Nachname: ' + lastName + '</li>' +
            '<li>E-Mail: ' + email + '</li>' +
            '<li>Nachricht: ' + message + '</li>' +
          '</ul>' +
        '</div>';

  let html;
  let from;
  let to;

  if(recepient == 'client') {
    html = clientMail;
    from = "kontakt@samuelbiebel.de";
    to = JSON.stringify(email);
  } else if(recepient == 'admin') {
    html = adminMail;
    from = JSON.stringify(email);
    to = "kontakt@samuelbiebel.de";
  }

  let mailOptions = {
    from: from,
    to: to,
    subject: "Neue Nachricht über Kontaktformular:",
    html: html,
    attachments: [{
        filename: 'logo-transparent.svg',
        path: 'public/images/styles/logo-transparent.svg',
        cid: 'logo.@ruepel-transparent.2022.de'
    }]
  }

  smtpTransporter.sendMail(mailOptions, (error, res) => {
      if (error) {
          console.log(error);
          res.sendStatus(404);
      } else {
          console.log("Successfully sent email.");
          res.sendStatus(304);
      }
  });
}

module.exports = sendMail;
