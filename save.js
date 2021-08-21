const util = require("util");
const fs = require("fs");
const uuid = require("uuid").v1;

class Save {
    read() {
        return util.promisify(fs.readFile)('db/db.json', "utf8")
    }
    write(note) {
        return util.promisify(fs.writeFile)('db/db.json', JSON.stringify(note))
    }

    getNote(note) {
        const{title, text} = note

        const newNote = {title, text, id: uuid()};

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(newNotes => this.write(newNotes))
            .then(() => this.newNote)
    }

    getNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }

    deleteNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(savedNotes => this.write(savedNotes))
    }
}

module.exports = new Save();