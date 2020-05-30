const yargs = require('yargs')
const notes = require("./notes.js")

yargs
    .command(
        'add',
        'add new note', (yargs) => {
            yargs.option('title', {
                describe: 'Note title',
                type: 'string',
                demandOption: true
            }).option('body',{
                describe: 'Note body',
                type:'string',
                demandOption:true
            })
        },
        (yargs) => {
            notes.addNote({
                'title' : yargs.title,
                'body' : yargs.body
            });
        })
    .command(
        'remove',
        'remove new note', (yargs) => {
            yargs.option('title',{
                describe: 'Note to remove',
                demandOption:true,
                type:'string'
            })
        },
        (yargs) => {
            notes.removeNote(yargs.title);
        })
    .command(
        'list',
        'list all notes',
        () => {
            notes.listNotes()
        })
    .command(
        'read',
        'read a note', (yargs) => {
            yargs.option('title', {
                describe: 'Note title',
                type: 'string',
                demandOption: true,
            })
        },
        (yargs) => {
            notes.readNote(yargs.title);
        })

yargs.parse()