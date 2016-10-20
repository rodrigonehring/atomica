'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var compression = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var dotenv = require('dotenv');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('./config/db');
var passport = require('passport');
var expressValidator = require('express-validator');
var multer = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */

var userController = require('./controllers/user');
var apiController = require('./controllers/api');
var contactController = require('./controllers/contact');
var postsController = require('./controllers/posts');

/**
 * API keys and Passport configuration.
 */
var passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function (req, res, next) {
  // After successful login, redirect back to the intended page
  if (!req.user && req.path !== '/login' && req.path !== '/signup' && !req.path.match(/^\/auth/) && !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), { maxAge: 31557600000 }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

/**
 * API app routes.
 */
app.post('/api-v2/login', userController.postLoginApi);
app.get('/api-v2/status', userController.statusLoginApi);
app.get('/api-v2/logout', userController.logoutLoginApi);
app.post('/api-v2/create-account', userController.createAccount);
app.get('/api-v2/users', userController.listUsers);
app.delete('/api-v2/users/remove/:id', userController.deleteUser);
app.put('/api-v2/users/add-admin/:id', userController.addAdmin);
app.put('/api-v2/users/remove-admin/:id', userController.removeAdmin);

app.get('/api-v2/posts', postsController.listPosts);
app.get('/api-v2/posts/read/:slug', postsController.postSlug);
app.post('/api-v2/posts', upload.single('image'), postsController.addPost);
app.delete('/api-v2/posts/delete/:id', postsController.deletePost);

app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

app.get('/api/upload', apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
/**
 * OAuth authentication routes. (Sign in)
 */

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/');
});

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;