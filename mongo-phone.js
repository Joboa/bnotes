const mongoose = require('mongoose');

console.log('argv:', process.argv)

if (process.argv.length < 3) {
  console.log(`Please provide the password as an argument: node mongo.js <password>`)
  process.exit(1)
}

// if (process.argv.length < 5) {
//   console.log(`Please add name and phone number`)
//   process.exit(1)
// }

const password = process.argv[2]

const url =
  `mongodb+srv://Joboa:${password}@cluster0.kwfwt.azure.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

// const phonebook = new Phonebook({
//   name: process.argv[3],
//   number: process.argv[4]
// })

// phonebook.save().then(result => {
//   console.log('phonbook saved!')
//   mongoose.connection.close()
// })

Phonebook.find({}).then(result => {
  result.forEach(pb => {
    console.log(pb)
  })
  mongoose.connection.close()
})