const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const config = require('config')
const session = require('express-session')
const jwt = require('jsonwebtoken')

const MongoStore = require('connect-mongo')(session)
const RedditStrategy = require('passport-reddit').Strategy

mongoose.connect(config.mongoURL)

mongoose.connection.on('error', function (err) {
  console.log('DB Connection Error')
  console.log(err)

  process.exit()
})

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// sessions are only used for the authentication pathway. JWTs are usually used instead.
app.use(session({
  secret: config.secret,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

/**
 * All responses should be JSON unless otherwise mentioned
 */
app.use(function (req, res, next) {
  res.contentType('application/json')
  res.setHeader('X-Powered-By', 'The dreams and salt of MHOC')
  next()
})

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new RedditStrategy({
  clientID: config.reddit.key,
  clientSecret: config.reddit.secret,
  callbackURL: 'http://' + config.deploymentURL + '/api/auth/return'
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    // TODO: Grab extended user from the DATABASE
    console.log(profile)
    return done(null, profile)
  })
}))

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.status(401).json({err: {code: 401, desc: 'Not logged in'}})
}

app.use(passport.initialize())
app.use(passport.session())

/**
 * Endpoints Begin
 */

/**
 * Health Endpoint. Sends 200 if up
 */
app.get('/api/health', function (req, res, next) {
  res.status(200).json({time: new Date(), uptime: process.uptime(), memory: process.memoryUsage()})
})

/**
 * Auth Endpoints Begin
 */

 /**
  * Gets the redirect url and sends it to the client which will then redirect
  */
app.get('/api/auth/login', function (req, res, next) {
  passport.authenticate('reddit', {
    state: 'test',
    duration: 'permanent'
  })(req, res, next)
})

/**
 * Handles the return from the reddit site
 */
app.get('/api/auth/return', function (req, res, next) {
  passport.authenticate('reddit', {
    successRedirect: '/#/login/success',
    failureRedirect: '/#/login'
  })(req, res, next)
})

/**
 * Handles the client requesting a JWT
 */
app.get('/api/auth/jwt', ensureAuthenticated, function (req, res, next) {
  jwt.sign({
    name: req.user.name,
    admin: false
  }, config.secret, function (err, jwtString) {
    if (err) { return next(err) }

    res.status(200).json({'jwt': jwtString})

    req.session.destroy() // Terminate the login and user. JWT then becomes the soul form of session.
    req.user = null
  })
})

/**
 * 404 Handler
 */
app.use(function (req, res, next) {
  res.status(404).json({err: {code: 404, desc: 'Resource not found'}})
})

app.listen(process.env.PORT || 8081)