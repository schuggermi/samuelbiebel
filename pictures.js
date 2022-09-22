const mongoose = require('mongoose');
const Picture = require('./models/picture');

mongoose.connect('mongodb://localhost:27017/ruepel', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.log("Can not connect to MongoDB. There was an error: ");
  console.log(err);
});
