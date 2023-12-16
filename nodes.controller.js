const fs = require('fs/promises')
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, 'db.json')
async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await fs.writeFile('./db.json', JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was added!'))
}

async function removeNote(id) {
  let notes = await getNotes()
  notes = notes.filter(note => note.id !== id)
  await fs.writeFile('./db.json', JSON.stringify(notes))
  console.log(chalk.bgRed('The note has been deleted!'))
}

async function editNote(editedNote) {
  let notes = await getNotes()
  notes = notes.map(note => {
    if (note.id === editedNote.id) {
      return editedNote
    }
    return note
  })
  await fs.writeFile('./db.json', JSON.stringify(notes))
  console.log(chalk.bgBlue('The note has been edited!'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach(note => {
    console.log(note.id, chalk.yellow(note.title))
  })
}

module.exports = {
  addNote, removeNote, getNotes, editNote
}