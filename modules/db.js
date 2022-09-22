const mongoose = require('mongoose');

async function connectDatabase() {
  await mongoose.connect('mongodb+srv://admin-schuggermi:0111MiSchu1999@cluster0.qmio8.mongodb.net/ruepel',
    {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("Can not connect to MongoDB. There was an error: ");
    console.log(err);
  });
}

module.exports = connectDatabase;
