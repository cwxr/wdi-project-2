var express = require('express')
var router = express.Router()
var Agent = require('../models/agent')
var passport = require('../config/passport')

// PROFILE PAGE =========================
router.get('/profile', isLoggedIn, function(req, res) {
  // go and get all clients
  Policy.find({}, function(err, allPolicy) {
    if (err) res.send(err)
    Client.find({
      agentID: req.user._id
    }, function(err, allClient) {
      res.render('profile', {
        allPolicy: allPolicy,
        agent: req.user,
        allClient: allClient
      })
    })
  })
})

// LOGOUT ==============================
router.get('/logout', function(req, res) {
  // console.log('here')
  req.logout()
  // res.send('helloworld')
  res.redirect('/')
})

// LOGIN ===============================
// show the login form
router.get('/login', function(req, res) {
  res.render('auth/login')
})

// process the login form
router.post('/login', function(req, res) {
  passport.authenticate('local', {
    successFlash: 'You have successfully logged in',
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/auth/login', // redirect back to the signup page if there is an error
    failureFlash: 'Login Failed' // allow flash messages
  })(req, res)
})

// SIGNUP =================================
// show the signup form
router.get('/signup', function(req, res) {
  res.render('auth/signup')
})

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
  failureFlash: 'You need to enter all required fields' // allow flash messages
}))

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

module.exports = router
