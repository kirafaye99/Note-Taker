const express = require("express");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const db = require('./db/db.json');
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})


app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
})
app.get('/api/notes', (req, res) => {
    res.json(db.slice(1));
})
app.post('/api/notes', (req, res) => {
    const noteEl = JSON.parse(fs.readFileSync('./db/db.json'))
    const add = req.body

    add.id = uuidv4()
    noteEl.push(add)

    fs.writeFileSync('./db/db.json', JSON.stringify(noteEl))

    res.json(noteEl);

    res.json(db);
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});


module.exports = app;