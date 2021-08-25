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

//go to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//show note
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
})
app.get('/api/notes', (req, res) => {
    res.json(db.slice(1));
})
app.post('/api/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('./db/db.json'))
    const add = req.body

    add.id = uuidv4()
    note.push(add)

    fs.writeFileSync('./db/db.json', JSON.stringify(note))

    res.json(note);

    res.json(db);
})

//delete note
app.delete('/api/notes/:id', (req, res) => {
    delNote(req.params.id, db)
    res.json(true);
});
function delNote(id, arr) {
    for(let i = 0; i < arr.length; i++) {
        let button = arr[i];

        if(button.id == id) {
            arr.splice(i, 1);
            fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(arr));
        }
    }
};

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});


module.exports = app;