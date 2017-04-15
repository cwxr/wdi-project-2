var express = require('express')
var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
var port = process.env.PORT || 4000

// setup DB
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/proj2'
mongoose.connect(dbURI)

// check if our connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('DB is connected')
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

// require the auth_agent controller
var auth_agentController = require('./controllers/auth_agent')
app.use('/', auth_agentController)

// error msg
app.use(function (req, res) {
  res.send('Error detected')
})

app.listen(port, function () {
  console.log('app is running at ' + port)
})
