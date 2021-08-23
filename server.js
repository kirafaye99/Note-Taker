const express = require('express');
// const apiRoute = require('./routes/api');
// const viewRoute = require('./routes/view');
const uuid = require("uuid").v4;
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// app.use('/api', apiRoute);
// app.use('/', viewRoute);

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});