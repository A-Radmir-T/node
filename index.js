const http = require("http");
const express = require('express')
const chalk = require("chalk");
const fs = require('fs/promises')
const path = require('path')
const {addNote, getNotes, removeNote, editNote} = require("./nodes.controller");

const port = 3000

const basePath = path.join(__dirname, 'pages')

const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})
app.post('/', async (req, res) => {
  if (req.body.title) {
    await addNote(req.body.title)
  }
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  })
})
app.delete('/:id', async (req, res) => {

  await removeNote(req.params.id)

  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.put('/:id', async (req, res) => {

  await editNote(req.body)

  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})



app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`))
})