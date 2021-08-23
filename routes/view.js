const path = require('path');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// router.get('/api/notes', (req, res) => {
//     res.json(db);
// })
// router.post('api/notes', (req, res) => {
//     const noteElement = createNote(req.body, db);
// })

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;