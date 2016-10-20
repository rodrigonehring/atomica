'use strict';

var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');

exports.statusLoginApi = function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user, img: req.user.gravatar() });
  } else return res.json('not_connected');
};

exports.logoutLoginApi = function (req, res) {
  req.logout();
  res.json({ msg: 'logout' });
};

exports.postLoginApi = function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  if (req.isAuthenticated()) return res.status(409).json({ error: 'user_already_logged' });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(202).json(errors);
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.json({ user: user, img: user.gravatar() });
    });
  })(req, res, next);
};

exports.createAccount = function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('password2', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  var user = new User({
    email: req.body.email,
    admin: true,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(409).json({ msg: 'Account with that email address already exists.' });
    }
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        res.json({ user: user });
      });
    });
  });
};

exports.listUsers = function (req, res) {
  if (req.user && req.user.admin) {
    User.find('').then(function (users) {
      return res.json(users);
    });
  } else {
    res.status(401).json({ msg: 'permission denied' });
  }
};

exports.deleteUser = function (req, res) {
  if (req.user._id == req.params.id) return res.status(400).json({ msg: 'Se deletar?' });
  if (req.user && req.user.admin) {
    User.findOne({ _id: req.params.id }).remove().then(function () {
      res.json({ msg: 'removed' });
    });
  } else {
    res.status(401).json({ msg: 'permission denied' });
  }
};

exports.addAdmin = function (req, res) {
  if (req.user && req.user.admin) {
    User.findOne({ _id: req.params.id }).then(function (user) {
      user.admin = true;
      user.save().then(function () {
        return res.json({ user: user });
      });
    });
  } else {
    res.status(401).json({ msg: 'permission denied' });
  }
};

exports.removeAdmin = function (req, res) {
  if (req.user._id == req.params.id) return res.status(400).json({ msg: 'Remover o proprio admin?' });
  if (req.user && req.user.admin) {
    User.findOne({ _id: req.params.id }).then(function (user) {
      user.admin = false;
      user.save().then(function () {
        return res.json({ user: user });
      });
    });
  } else {
    res.status(401).json({ msg: 'permission denied' });
  }
};

/**
 * GET /login
 * Login page.
 */
exports.getLogin = function (req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = function (req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Create Account'
  });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.redirect('/signup');
    }
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = function (req, res) {
  res.render('account/profile', {
    title: 'Account Management'
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = function (req, res, next) {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err);
    }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save(function (err) {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = function (req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err);
    }
    user.password = req.body.password;
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = function (req, res, next) {
  User.remove({ _id: req.user.id }, function (err) {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash('info', { msg: 'Your account has been deleted.' });
    res.redirect('/');
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = function (req, res, next) {
  var provider = req.params.provider;
  User.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err);
    }
    user[provider] = undefined;
    user.tokens = user.tokens.filter(function (token) {
      return token.kind !== provider;
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      req.flash('info', { msg: provider + ' account has been unlinked.' });
      res.redirect('/account');
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  User.findOne({ passwordResetToken: req.params.token }).where('passwordResetExpires').gt(Date.now()).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('/forgot');
    }
    res.render('account/reset', {
      title: 'Password Reset'
    });
  });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = function (req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long.').len(4);
  req.assert('confirm', 'Passwords must match.').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  async.waterfall([function (done) {
    User.findOne({ passwordResetToken: req.params.token }).where('passwordResetExpires').gt(Date.now()).exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
        return res.redirect('back');
      }
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        req.logIn(user, function (err) {
          done(err, user);
        });
      });
    });
  }, function (user, done) {
    var transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    var mailOptions = {
      to: user.email,
      from: 'hackathon@starter.com',
      subject: 'Your Hackathon Starter password has been changed',
      text: 'Hello,\n\nThis is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    };
    transporter.sendMail(mailOptions, function (err) {
      req.flash('success', { msg: 'Success! Your password has been changed.' });
      done(err);
    });
  }], function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Forgot Password'
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = function (req, res, next) {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  async.waterfall([function (done) {
    crypto.randomBytes(16, function (err, buf) {
      var token = buf.toString('hex');
      done(err, token);
    });
  }, function (token, done) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) {
        req.flash('errors', { msg: 'Account with that email address does not exist.' });
        return res.redirect('/forgot');
      }
      user.passwordResetToken = token;
      user.passwordResetExpires = Date.now() + 3600000; // 1 hour
      user.save(function (err) {
        done(err, token, user);
      });
    });
  }, function (token, user, done) {
    var transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    var mailOptions = {
      to: user.email,
      from: 'hackathon@starter.com',
      subject: 'Reset your password on Hackathon Starter',
      text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n\n          Please click on the following link, or paste this into your browser to complete the process:\n\n\n          http://' + req.headers.host + '/reset/' + token + '\n\n\n          If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    transporter.sendMail(mailOptions, function (err) {
      req.flash('info', { msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
      done(err);
    });
  }], function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/forgot');
  });
};