const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
const bikes = require('./api/routes/cases');
const officer = require('./api/routes/officer');

// create express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// models
require('./api/models/report');
require('./api/models/officer');

// routes
app.use('/bikes', bikes);
app.use('/officer', officer);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
       error: err
    });
});

// Connecting to the database
mongoose.connect(dbConfig.URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the reports database");
}).catch(err => {
    console.log('Could not connect to the reports database. Exiting now...', err);
    process.exit();
});


module.exports = app;
