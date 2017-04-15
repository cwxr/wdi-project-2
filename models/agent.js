var mongoose = require('mongoose')

// create the Agent Schema
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
var bcrypt = require('bcrypt')
var agentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  username: {
    type: String,
    required: true,
    minlength: [3, 'name must be between 3 and 99 characters'],
    maxlength: [99, 'name must be between 3 and 99 characters']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'password must be between 6 and 99 characters'],
    maxlength: [99, 'password must be between 6 and 99 characters']
  }
})

// create === var newUser = new User && newUser.save()
agentSchema.pre('save', function (next) {
  var agent = this
  console.log('saving agent profile', agent)

  // where we hash the password
  var hash = bcrypt.hashSync(agent.password, 10)
  console.log('original password', agent.password)
  console.log('hashed password', hash)

  agent.password = hash
  next()
})

var Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent
