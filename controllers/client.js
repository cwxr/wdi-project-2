var express = require('express')
var router = express.Router()
var Client = require('../models/client')
var Policy = require('../models/policy')
var passport = require('../config/passport')

// show the create client form
router.get('/createclient', function(req, res) {
  res.render('createclient')
})

// CREATE THE CLIENT
router.post('/createclient', function(req, res) {
  // res.send('in /client/createclient post')
  // create client when we receive the post request
  var newClient = new Client({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    email: req.body.email,
    agentID: req.user._id
  })
  newClient.save(function(err) {
    if (err) res.send(err)
    res.redirect('/profile')
  })
})

// FIND ALL CLIENTS
router.get('/', function(req, res) {
  res.redirect('/profile')
})

// FIND ONE CLIENT BY ID
router.get('/:id', function(req, res) {
  Client.findById(req.params.id, function(err, client) {
    if (err) res.send(err)
    Policy.find({
      clientID: req.params.id // filter policies
    }, function(err, policies) {
      if (err) res.send(err)
      res.render('clientprofile', {
        client: client,
        allPolicy: policies
      })
    })
  })
})

// UPDATE EMAIL FOR CLIENT
router.put('/:id', function(req, res, next) {
  Client.findByIdAndUpdate(req.params.id, {
    email: req.body.email
  }, function(err, client) {
    if (err) next()
    req.flash('success', 'Update Client is Successful')
    res.redirect('/client/' + client._id)
  })
})

// DELETE
router.delete('/deleteclient/:id', function(req, res, next) {
  Client.findByIdAndRemove(req.params.id, function(err) {
    if (err) next()
    res.render('deleteclient')
  })
})

module.exports = router
