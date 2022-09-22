const express = require('express');
const path = require('path');
const jquery = require('jquery');
const mongoose = require('mongoose');
const db = require('./modules/db.js');
const nodemailer = require("nodemailer");
const mailGun  = require("nodemailer-mailgun-transport");
const sendMail = require('./modules/sendMail.js');

const ROUTER = require('./routes/routes.js');
const GALERY = require('./routes/galery/galery.js');
const EVENTS = require('./routes/events/events.js');
const CONTACT = require('./routes/contact/contact.js');

// Connect to database
db();

const app = express();
let PORT = process.env.PORT;

app.enable("trust proxy");

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(function(req, res, next) {
//     if(!req.secure) {
//       return res.redirect("https://www.samuelbiebel.de");
//     }
//     next();
// });

app.use('/', ROUTER, GALERY, EVENTS, CONTACT);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


if(PORT == null || PORT == "") { PORT = 3000; }
app.listen(PORT, () => {
  console.log("The server started and keeps running on port " + PORT);
});
