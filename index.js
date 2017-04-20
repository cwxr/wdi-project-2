// set up
// get all the tools we need
var express = require('express')
var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
var port = process.env.PORT || 4000
var passport = require('passport')
var flash = require('connect-flash')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var Agent = require('./models/agent')
var Client = require('./models/client')
var Policy = require('./models/policy')
var path = require('path')

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

// initialize passport
var passport = require('./config/passport')

// CSS
app.use(express.static(path.join(__dirname, 'public')))

// set up our express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)

// setup body parser
var bodyParser = require('body-parser')
// transform form data to req.body
app.use(bodyParser.urlencoded({
  extended: true
}))
// transform JSON data to req.body
app.use(bodyParser.json())

// setup the ejs template
app.use(ejsLayouts)
app.set('view engine', 'ejs')

// setup the method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

require('dotenv').config({silent: true})
// required for passport
app.use(session({
  secret: process.env.SESSION_SECRET, // session secret
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session
app.use(function (req, res, next) {
 // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})
app.get('/', function (req, res) {
  res.render('home')
})

// require the auth_agent controller
app.get('/profile', isLoggedIn, function (req, res) {
  // go and get all clients
  Policy.find({}, function (err, allPolicy) {
    if (err) res.send(err)
    Client.find({
      agentID: req.user._id
    }, function (err, allClient) {
      res.render('profile', {
        allPolicy: allPolicy,
        agent: req.user,
        allClient: allClient
      })
    })
  })
  // Clients.findAll
    // agent: req.agent
    // clients: clients
})
// CONTROLLERS
var auth_Controller = require('./controllers/auth')
app.use('/auth', auth_Controller)

var clientController = require('./controllers/client')
app.use('/client', clientController)

var policyController = require('./controllers/policy')
app.use('/policy', policyController)

// error msg
// app.use(function (req, res) {
//   res.send('Error detected')
// })

// to ensure user is logged in
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

app.listen(port, function () {
  console.log('app is running at ' + port)
  var Scheduler = require('./scheduler')
})
