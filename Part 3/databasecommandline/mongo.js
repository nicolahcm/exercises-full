const mongoose = require('mongoose')

// from command line type
// node mongo ${password} ${name person} ${password person}
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
constUrl = `mongodb+srv://nicola1234:${password}@blogexperiscluster.al9lg.mongodb.net/testExerciseFullStackOpen?retryWrites=true&w=majority`


mongoose.connect(constUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection estabilished!"))
    .catch((err) => console.error(err.message));



const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('person', personSchema)  // mongo converts the collection name "person" into people automatically!!!


// If name and number inserted, create a new person.
// Otherwise list all people.
if (name && number) {
    const newPerson = Person({ name: name, number: number })

    newPerson.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(res => {
        console.log(`phonebook: ${JSON.stringify(res)}`)
        mongoose.connection.close()
    })
}
