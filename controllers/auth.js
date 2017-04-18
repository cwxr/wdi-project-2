var express = require('express')
var router = express.Router()
var Agent = require('../models/agent')
var passport = require('../config/passport')
// var router = express()

// show the home page (will also have our login links)
router.get('/', function (req, res) {
  res.render('/home')
})

// PROFILE PAGE =========================
router.get('/profile', isLoggedIn, function (req, res) {
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

// LOGOUT ==============================
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

// LOGIN ===============================
// show the login form
router.get('/login', function (req, res) {
  res.render('auth/login', { message: req.flash('loginMessage') })
})

// process the login form
router.post('/login', function (req, res) {
  passport.authenticate('local', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/auth/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })(req, res)
}
)

// SIGNUP =================================
// show the signup form
router.get('/signup', function (req, res) {
  res.render('auth/signup')
})

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}))

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

module.exports = router
// router.route('/register')
// .get(function (req, res) {
//   res.render('auth/signup')
// })
// .post(function (req, res) {
//   var newAgent = new Agent({
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password
//   })
//
//   newAgent.save(function (err, data) {
//     if (err) return res.redirect('/register')
//     res.redirect('/')
//   })
// })

// router.get('/login', function (req, res) {
//   res.render('auth/login')
// })
