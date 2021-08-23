// const util = require("util");
const fs = require("fs");
const uuid = require("uuid").v4;
const router = require('express').Router();
const db = require('./db/db.json')


router.get('/api/notes', (req, res) => {
    res.json(db);
})
router.post('api/notes', (req, res) => {
    const noteElement = createNote(req.body, db);
    res.json(noteElement)
})
function createNote(body, event) {
    const noteElement = {
        id: uuid(),
        title: body.title,
        text: body.text,
    };

    let noteArray = event || [];
    noteArray.push(noteElement);

    fs.writeFileSync(
        path.join(__dirname, db),
        JSON.stringify(noteArray)
    );
    return noteElement;
}


module.exports = router;

// class Save {
//     read() {
//         return util.promisify(fs.readFile)('./db/db.json', "utf8")
//     }
//     write(note) {
//         return util.promisify(fs.writeFile)('./db/db.json', JSON.stringify(note))
//     }

//     getNote(note) {
//         const{title, text} = note

//         const newNote = {title, text, id: uuid()};

//         return this.getNotes()
//             .then(notes => [...notes, newNote])
//             .then(newNotes => this.write(newNotes))
//             .then(() => this.newNote)
//     }

//     getNotes() {
//         return this.read()
//             .then(notes => {
//                 return JSON.parse(notes) || [];
//             })
//     }

//     deleteNote(id) {
//         return this.getNotes()
//             .then(notes => notes.filter(note => note.id !== id))
//             .then(savedNotes => this.write(savedNotes))
//     }
// }

// module.exports = new Save();