var express = require('express')
var router = express.Router()
var Client = require('../models/client')
var passport = require('../config/passport')

// show the create client form
router.get('/createclient', function (req, res) {
  res.render('createclient')
})

// CREATE THE CLIENT
router.post('/createclient', function (req, res) {
  // res.send('in /client/createclient post')
// create client when we receive the post request
  var newClient = new Client({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    email: req.body.email,
    agentID: req.user._id
  })
  newClient.save(function (err) {
    if (err) res.send(err)
    res.redirect('/profile', {
      newClient: newClient,
      agent: req.user
    })
  })
})

// FIND ALL CLIENTS
router.get('/', function (req, res) {
  res.redirect('/profile')
})
  // Client.find({}, function (err, allClient) {
  //   if (err) res.send(err)
  //   res.send(allClient)
  // })

// FIND ONE CLIENT BY ID
router.get('/client/:id', function (req, res) {
  Client.findById(req.params.id, function (err, client) {
    if (err) res.send(err)
    res.render('new_page')
  })
})

// DELETE
router.delete('/client/:id', function (req, res, next) {
  Client.findByIdAndRemove(req.params.id, function (err) {
    if (err) next()
    res.send('Client deleted')
  })
})

module.exports = router
