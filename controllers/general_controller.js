
var express = require('express')
var router = express.Router()

// setup model
var Data = require('../models/data')

// route for /movies
router.route('/data')
.get(function (req, res) {
  Data.find({}, function (err, allData) {
    if (err) res.send(err)
    res.send(allData)
  })
})

module.exports = router
