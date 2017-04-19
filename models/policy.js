var mongoose = require('mongoose')

// create the Policy Schema
var policySchema = new mongoose.Schema({
  policytype: {
    type: String,
    required: true
  },

  policynumber: {
    type: String,
    required: true
  },

  policyname: {
    type: String,
    required: true
  },

  policystartdate: {
    type: Date,
    required: true
  },

  policyenddate: {
    type: Date,
    required: true
  },

  premium: {
    type: String,
    required: true
  },
  clientID: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client'
  }
})

policySchema.pre('save', function (next) {
  var policy = this
  console.log('Saving policy', policy)

  next()
})

var Policy = mongoose.model('Policy', policySchema)

module.exports = Policy
