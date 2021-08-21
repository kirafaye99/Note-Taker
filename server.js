const express = require('express');
const apiRoute = require('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));