const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const app = express();

mongoose.connect('mongodb+srv://TITech:hF4IFFGqNGD9mFcJ@cluster0-nqhfj.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to Firebase Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to Firebase Atlas!');
    console.error(error);
  });  

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/staff', staffRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;