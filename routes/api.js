const router = require('express').Router();

// const fs = require('fs');

const save = require('../save');

// const uuid = require("uuid").v4;


// router.get('/api/notes', (req, res) => {
//     res.json(db);
// })
// router.post('api/notes', (req, res) => {
//     const noteElement = createNote(req.body, db);
//     res.json(noteElement)
// })
// function createNote(body, event) {
//     const noteElement = {
//         id: uuid(),
//         title: body.title,
//         text: body.text,
//     };

//     let noteArray = event || [];
//     noteArray.push(noteElement);

//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify(noteArray)
//     );
//     return noteElement;
// }




router.get('/notes', (req, res) => {
    save
        .getNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/notes', (req, res) => {
    console.log(req.body)
    save
        .getNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/notes/:id', (req, res) => {
    save
        .deleteNote(req.params.id)
        .then(() => res.json({ok: true}))
        .catch(err => res.status(500).json(err))
})

module.exports = router;