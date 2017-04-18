var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var Agent = require('../models/agent')

// used to serialize the agent for the session
passport.serializeUser(function (agent, done) {
  console.log('hi')
  done(null, agent.id)
})

// used to deserialize the agent
passport.deserializeUser(function (id, done) {
  console.log('hello  ')
  Agent.findById(id, function (err, agent) {
    done(err, agent)
  })
})

// SIGN IN
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  console.log('entered')
  Agent.findOne({'email': email}, function (err, agent) {
    if (err) {
      console.log(err)
      return done(err)
    }
    if (!agent) {
      return done(null, false)
    }
    if (!agent.validPassword(password)) {
      return done(null, false)
    }
    return done(null, agent)
  })
}))

// SIGN UP
// passport local-signup strategy
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, givenEmail, givenPassword, next) {
  if (givenEmail) {
    email = givenEmail.toLowerCase()
  } // Use lower-case e-mails to avoid case-sensitive e-mail matching
  var newAgent = new Agent({
    email: givenEmail,
    name: req.body.name,
    password: givenPassword
  })

  newAgent.save(function (err, agent) {
    if (err) {
      console.log(err)
      // req.flash('error', 'Registration failed')
      // return next(err)
    }

    next(null, agent)
  })
}))
module.exports = passport
//
// // LOGIN
// passport.use('local-login', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
// }, function (req, givenEmail, givenPassword, done) {
//   console.log('given email', givenEmail)
//   var email = null
//   if (givenEmail) {
//     email = givenEmail.toLowerCase()
//   } // Use lower-case e-mails to avoid case-sensitive e-mail matching
//
//   Agent.findOne({ 'email': email }, function (err, agent) {
//                 // if there are any errors, return the error
//     console.log('agent', agent)
//     if (err) {
//       return done(err)
//     }
//
//                 // if no agent is found, return the message
//     if (!agent) {
//       return done(null, false, req.flash('loginMessage', 'Agent not found.'))
//     }
//
//     if (!agent.validPassword(givenPassword)) { return done(null, false, req.flash('loginMessage', 'Password invalid.')) }
//
//                 // if ok, return agent
//     else {
//       return done(null, agent)
//     }
//   })
// }))
