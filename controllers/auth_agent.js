var express = require('express')
var router = express.Router()
var Agent = require('../models/agent')

router.route('/register')
.get(function (req, res) {
  res.render('auth/signup')
})
.post(function (req, res) {
  var newAgent = new Agent({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })

  newAgent.save(function (err, data) {
    if (err) return res.redirect('/register')
    res.redirect('/')
  })
})

// router.get('/login', function (req, res) {
//   res.render('auth/login')
// })

module.exports = router
