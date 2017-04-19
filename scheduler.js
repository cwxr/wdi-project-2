console.log('hello')
var Policy = require('./models/policy')
var later = require('later')

function sendMsg (policy) {
  console.log('sending msg')
  console.log(policy)
}

function checkPolicy () {
  Policy.find(function (err, policies) {
    if (err) res.send(err)
    policies.forEach(function (policy) {
      if (policy.policyenddate - 30 * 24 * 60 * 60 * 1000 < new Date()) sendMsg(policy)
    })
  })
}
// checkPolicy()

// define a new schedule
var cronSched = later.parse.cron('*/1 * * * *')
// console.log(later.schedule(cronSched).next(10))
later.setInterval(checkPolicy, cronSched)
