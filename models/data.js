var mongoose = require('mongoose')

// setting up schema
var dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  policy: String,
  age: Number
})

// setting up models
var Data = mongoose.model('Data', dataSchema)

module.exports = Data
