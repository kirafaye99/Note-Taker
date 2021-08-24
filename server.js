const express = require('express');
const fs = require('fs');
const uuid = require("uuid").v4;
const db = require('./db/db.json');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})
app.get('/api/notes', (req, res) => {
    res.json(db);
})
app.post('/api/notes', (req, res) => {

    const noteEl = genNote(req.body, db);
    res.json(noteEl);
})

function genNote(body, event) {
    const noteElement = {
        id: uuid(),
        title: body.title,
        text: body.text,
    };

    let noteArray = event || [];
    noteArray.push(noteElement);

    fs.writeFileSync( path.join(__dirname, db), JSON.stringify(noteArray));
    return noteElement;
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});