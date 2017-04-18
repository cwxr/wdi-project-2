var express = require('express')
var router = express.Router()
var Policy = require('../models/policy')
var passport = require('../config/passport')

  // show the create policy form
router.get('/createpolicy', function (req, res) {
  res.render('createpolicy')
})

  // CREATE THE POLICY
router.post('/createpolicy', function (req, res) {
  // create client when we receive the post request
  var newPolicy = new Policy({
    policytype: req.body.policytype,
    policynumber: req.body.policynumber,
    policyname: req.body.policyname,
    policystartdate: req.body.policystartdate,
    policyenddate: req.body.policyenddate,
    premium: req.body.premium,
    clientID: req.user._id
  })
  newPolicy.save(function (err) {
    if (err) res.send(err)
    res.redirect('/profile')
  // next()
  })
})

  // FIND ALL POLICIES
router.get('/', function (req, res) {
  res.redirect('/profile')
})

  // FIND ONE POLICY BY ID
router.get('/policy/:id', function (req, res) {
  Policy.findById(req.params.id, function (err, policy) {
    if (err) res.send(err)
    res.render('new_page')
  })
})

  // DELETE
router.delete('/policy/:id', function (req, res, next) {
  Policy.findByIdAndRemove(req.params.id, function (err) {
    if (err) next()
    res.send('Policy deleted')
  })
})

module.exports = router
