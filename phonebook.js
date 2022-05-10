const { urlencoded } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
morgan('tiny')
app.use(morgan('combined'))

let phonebooks = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040,123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323-523'
  }
]

// GET: info
app.get('/info', (request, response) => {
  const numberOfPersons = phonebooks.length
  console.log(numberOfPersons)
  response.send(`Phonebook has info for ${numberOfPersons} people 
  <br><br>
  ${new Date()}`)
})

// GET: /phonebook
app.get('/api/phonebooks/', (request, response) => {
  response.json(phonebooks)
})

// GET: /phonebook/id
app.get('/api/phonebooks/:id', (request, response) => {
  const id = Number(request.params.id)
  const phonebook = phonebooks.find(phonebook => phonebook.id === id)

  if (phonebook) {
    response.json(phonebook)
  }
  response.status(404).end(`phonebook with id: ${id} not found!`)
})

// get id
const generateId = () => {
  const maxId = phonebooks.length > 0
    ? Math.max(...phonebooks.map(n => n.id))
    : 0
  return maxId + 1
}

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
  const getName = phonebooks.find(pb => pb.name === body.name)

  if (getName) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const phonebook = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  phonebooks = phonebooks.concat(phonebook)

  response.json(phonebook)
})

// DEETE: /phonebook/id
app.delete('/api/phonebooks/:id', (request, response) => {
  const id = request.params.id
  const phonebook = phonebooks.filter(phonebook => phonebook.id !== id)
  response.status(204).end()
})

PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})