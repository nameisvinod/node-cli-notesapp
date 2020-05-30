const fs = require('fs')
const chalk = require('chalk')

const NOTES = 'notes.json';

const addNote = (note) => {
    const notes = loadNotes();
    const duplicatenNote = notes.find((savedNote) => savedNote.title === note.title)

    debugger

    if (!duplicatenNote) {
        notes.push(note);
        saveNotes(notes);
        console.log(chalk.green('new note added!'));
    } else {
        console.log(chalk.red('duplicate note found!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => title !== note.title)
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red("no such note found!"));
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green("note removed!"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow("Your notes"));
    notes.forEach((note) => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.green(note.title));
        console.log(chalk.cyanBright(note.body));
    } else {
        console.log(chalk.red("no such note found again!"));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(NOTES);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync(NOTES, JSON.stringify(notes));
}

module.exports = {
    addNote: addNote, 
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}