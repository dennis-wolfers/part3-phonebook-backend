const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://dFullstack:${password}@cluster0.gzblo.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  let list = 'phonebook:'
  Person.find({}).then((persons) => {
    persons.map((person) => {
      list += '\n' + person.name + ' ' + person.number
    })
    console.log(list)
    mongoose.connection.close()
  })
} else {
  const newName = process.argv[3]
  const newNumber = process.argv[4]
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
