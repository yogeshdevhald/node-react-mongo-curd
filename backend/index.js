const express =  require('express');
const app     =  express()
const bodyParser = require('body-parser');
var cors = require("cors");
const mongoose = require('mongoose');
//const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  //   origin: ["http://localhost:3000"],
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
const Routs = require('./../backend/routs/route.js');
const MONGO_URI = 'mongodb://localhost:27017/curd';
app.use('/app',Routs)

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(3000, () => {
  console.log('...........................server is running successfully............');
});