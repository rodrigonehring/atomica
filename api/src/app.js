/**
 * Module dependencies.
 */
import express from 'express';
import compression from 'compression';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import expressValidator from 'express-validator';
import multer from 'multer';
// import db from './config/db';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

dotenv.load({ path: path.resolve(__dirname, '../.env') });

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running. db.js');
  process.exit(1);
});

/**
 * API keys and Passport configuration.
 */
import passportConfig from './config/passport';



/**
 * Create Express server + socket.io
 */
import http from 'http';
import socket from 'socket.io';
const app = express();
const server = http.createServer(app);
const io = socket(server);

io.sockets.on('connect', function (socket) {
  console.log("New Connection");
  socket.on('worked!', console.log);
});

/**
 * Controllers (route handlers).
 */
import userController from './controllers/user';
import apiController from './controllers/api';
import contactController from './controllers/contact';
import postsController from './controllers/posts';
import ChatController from './controllers/chat';
const chatController = ChatController(io.sockets);


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.use(compression());

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

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
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  }
  next();
});
app.use( express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));
app.use( express.static(path.join(__dirname, '../public/react'), { maxAge: 31557600000 }));
app.use( '/uploads', express.static(path.join(__dirname, 'uploads'), { maxAge: 31557600000 }));

app.use(function(req, res, next) {
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

//chat
app.get('/api-v2/chat', chatController.getMessages);
app.post('/api-v2/chat', chatController.addMessage);
app.delete('/api-v2/chat', chatController.deleteMessages);
app.delete('/api-v2/chat/:id', chatController.deleteMessage);

app.get('/', (req, res) => {
  const index = path.resolve(__dirname,'../public/react/index.html');
  res.sendFile(index);
});

app.get('/chat', (req, res) => {
  const index = path.resolve(__dirname,'../public/react/index.html');
  res.sendFile(index);
});

app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);



app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

app.get('/api/upload', apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
/**
 * OAuth authentication routes. (Sign in)
 */

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = server;
