var mongoose = require('mongoose')

// create the Client Schema
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
var clientSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    match: emailRegex
  },

  agentID: {
    type: mongoose.Schema.ObjectId,
    ref: 'Agent'
  }
})

// create === var newClient = new Client && newClient.save()
clientSchema.pre('save', function (next) {
  var client = this
  console.log('Saving client profile', client)

  next()
})

var Client = mongoose.model('Client', clientSchema)

module.exports = Client
