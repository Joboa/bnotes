const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/phonebook')

// middleware
const requestLogger = (request, response, next) => {
  console.log("Method", request.method)
  console.log("Path", request.path)
  console.log("Body", request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))

// POST: /phonebooks
app.post('/api/phonebooks', (request, response) => {

  const body = request.body

  // check for name and number
  if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // check if name already exist
  const getExistingName = Person.find(person => person.name === body.name)

  if (getExistingName) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const phonebook = new Person({
    name: body.name,
    number: body.number,
  })

  phonebook.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

// GET: /phonebook
app.get('/api/phonebooks', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// GET: /phonebook/id
app.get('/api/phonebooks/:id', (request, response) => {
  // const id = request.params.id
  Person.findById(request.params.id).then(pers => {
    response.json(pers)
  })
})

PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})