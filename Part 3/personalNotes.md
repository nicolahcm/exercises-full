PART A

2) when a post request is sent to our backend, and it sends json, we need to parse it.
---> json parser middleware!
app.use(express.json())

3) The main source of errors is not sending headers with content-type
--> Pro tip: 

console.log(request.headers)


4) in the routes, 
(req,res) => {
    ...
    return   // This is a function. so we just need to return to stop the execution of the function
}


5) When deleting a resource, (so it exists:)

respond with 

res.status(204).end() 

// no messages


6) when no person has been found ( /persons/:id), both for get,post,put,delete requests, send:

res.status(404).end()

// no messages.



7) There is also the handling of all the errors...



Middlewares.
8) "Let's add the following middleware after our routes, that is used for catching requests made to non-existent routes. For these requests, the middleware will return an error message in the JSON format."

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


9) morgan middleware for logging information. 

// define token
morgan.token("token1", (req,res)=> {return JSON.stringify(req.body)})

// use it:
app.use(morgan(":token1 "))


########### PART B: deploying on internet.


1) Before we linked our phonebook with db.json (json-server). For connecting it with our back-end we just need to change the base-url for connection from the front-end
1.1) Moreover we need to use CORS. 
--> npm install cors.
-->app.use(cors())


3) Deploying on HEROKU backend.

// 3.1 I think it is not required, it does it alone.
3.1) Procfile: Add a file called Procfile to the project's root to tell Heroku how to start the application.
--> web: npm start
3.2) .gitignore:  node_modules.


3*) Deploying on heroku frontend (React )



One Option: putting the frontend in the backend folder:
          ---> Build the frontend. Copy the build (folder 'build') and put it in the backend. 
          ---> app.use(express.static('build'))  
          ---> plus remember to change the url for making api calls (build after changing!).
This option can also be tested locally before delploying on heroku. It is best to try them first in different folders. Then put the frontend in the backend.


4) React PROXY:
After a restart, the React development environment will work as a proxy. If the React code does an HTTP request to a server address at http://localhost:3000 not managed by the React application itself (i.e. when requests are not about fetching the CSS or JavaScript of the application), the request will be redirected to the server at http://localhost:3001 (to indicate as proxy in package.json).




#############à PART C: saving data to MongoDB


Connecting the Backend With DB
0) const yourPassword = process.argv[2]

By passing to command line:
node mongo.js yourPassword


1) Displayingg nicely our cards from mongodb to the frontend.


// Note: this formats only when requiring the cards. See the get method.
// cards => res.json(cards)  will respond with the cards. These have a new format. 
// In the DB nothing is changed. There still is _id and __v!

cardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

let Card = mongoose.model('cards', cardSchema);


// when going to this route, the cards are displayed differently.

app.get("/", (req, res) => {
    Card.find({}).then(cards => res.json(cards))
})


2) .env library for storing 

2.1) npm install dotenv
2.2) import it:
require('dotenv').config()
2.3) create a file .env:
MONGODB_URI='mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'
PORT=3001
2.4) Now we cann access the variables in node: 
process.env.PORT
2.5) git ignore the file .env!!!


3) when not found: error status 404,
for example in /api/notes/:id (with id non existent.)

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {                                                      // NOT FOUND
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })       // Bad Request
    })
})



4) Moving error handling to the middleware. We change the code above into:

app.get('/api/notes/:id', (request, response, next) => {          // next parameter added!
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))                                  // next in the catch. Plus the argument of next is always an error!
})



4.1) If the next function is called with a parameter, then the execution will continue to the error handler middleware. Other intermediate middlewares will be ignored.

4.2) Express error handlers are middleware that are defined with a function that accepts 4 parameters. 

for example:

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {                                // which is built-in in express/mongo: malformatted id!
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)    // if it is not the error above, it will go on with the DEFAULT error handler of Express.
}

app.use(errorHandler)
    



5) Two important Errors to handle with two middlewares in this order. 
 a) is for unhandled route. 
 b) Is for the requests to /api/persons/:id (get, put, delete) with non existend id.
Code:

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)






############################# PART D: Validation and ESLint


1) Validate data with mongoose: ---> required field (earlier we didn't do it.).
If we do not set them, the promise will fail. (the promise that tries to save an invalid document: person.save())

1.1) this is especially for POST requests.


1.5) To the previous errorHandler we add an if condition:

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {                           // THIS HAS BEEN ADDED.
    return response.status(400).json({ error: error.message })
  }

  next(error)
}







2) DOTENV do not use in production!
With heroku, we can do like (command line):

heroku config:set MONGODB_URI=mongodb+srv://fullsta...





3) Unique Validation error: install mongoose-unique-validator. 
Check if a person with the name or other fields is already in the db.
In this case, the POST request, when making the save method, then the promise fails!. Handle this and return an error!


4) Not only we have to handle errors in the backend.
We also have to handle errors in the fronend!


personService
    .create({ ... })
    .then(createdPerson => {
      // ...
    })
    .catch(error => {                                      // HERE FOR EXAMPLE when POSTING PERSONS.
      // this is the way to access the error message
      console.log(error.response.data)
    })




Linting
with plugin (can also install the npm install eslint but better not so)
