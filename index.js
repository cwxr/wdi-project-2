// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 4000

// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/mymdb'
var mongoose = require('mongoose')
mongoose.connect(dbURI)

// check if our connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('really really connected')
})

// setup body parser
var bodyParser = require('body-parser')
// transform form data to req.body
app.use(bodyParser.urlencoded({
  extended: true
}))
// transform JSON data to req.body
app.use(bodyParser.json())

// setup the ejs template
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('home')
})

// require the movies_controller
var generalController = require('./controllers/general_controller')
app.use(generalController)

// error msg
app.use(function (req, res) {
  res.send('error found')
})

app.listen(port, function () {
  console.log('app is running at ' + port)
})
