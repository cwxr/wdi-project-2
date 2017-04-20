const nodemailer = require('nodemailer')
var Policy = require('./models/policy')
var Client = require('./models/client')
var Agent = require('./models/agent')
var later = require('later')

// create reusable transporter object using the default SMTP transport
const DEFAULT_USER = 'test@pixelarrow.com.sg'
const DEFAULT_PASS = 'Temppw123'

const SERVER_OPTS = {
  port: 465,
  host: 'mail.pixelarrow.com.sg',
  secure: true,
  auth: {
    user: DEFAULT_USER,
    pass: DEFAULT_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
}

const transporter = nodemailer.createTransport(SERVER_OPTS)

function sendMsg (policy, client, agent) {
  // create email
  var mailOptions = {
    from: 'test@pixelarrow.com.sg', // sender address
    to: agent.email, // list of receivers
    subject: 'Expiring Policies', // Subject line
    text: 'Hi ' + agent.name + ', Your client ' + client.firstname + ' ' + client.lastname + ' with policy number:' + policy.policynumber + ', for ' + policy.policytype + ' Insurance will be due on ' + policy.policyenddate + '.', // plain text body
    html: 'Hi ' + agent.name + ', <br>Your client ' + client.firstname + ' ' + client.lastname + ' with policy number:' + policy.policynumber + ', for ' + policy.policytype + ' Insurance will be due on ' + policy.policyenddate + '.'
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
  console.log('sending msg')
  console.log(policy, client, agent)
}

function checkPolicy () {
  Policy.find(function (err, policies) {
    if (err) res.send(err)
    policies.forEach(function (policy) {
      if (policy.policyenddate - 30 * 24 * 60 * 60 * 1000 < new Date() && policy.policyenddate - 29 * 24 * 60 * 60 * 1000 > new Date()) {
        Client.findById(policy.clientID, function (err, client) {
          if (err || !client) return
          Agent.findById(client.agentID, function (err, agent) {
            if (err || !agent) return
            sendMsg(policy, client, agent)
          })
        })
      }
    })
  })
}
// checkPolicy()

// define a new schedule
var cronSched = later.parse.cron('35 /11 * * * *')
// console.log(later.schedule(cronSched).next(10))
later.setInterval(checkPolicy, cronSched)
// checkPolicy()
