const { User, Session } = require('../models/authModel');
const bcrypt = require('bcryptjs');

const authController = {};

// handle login
authController.postLogin = (req, res, next) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(401).json('incorrect username or password');
  }
  User.findOne({ username: req.body.username })
    .exec()
    .then((data) => {
      bcrypt.compare(req.body.password, data.password, function (error, isMatch) {
        if (error) {
          console.log('authController.postLogin: ERROR: ' + error);
          return res.status(401).json('incorrect username or password');
        } else if (!isMatch) {
          console.log('authController.postLogin: ERROR: incorrect username or password');
          return res.status(401).json('incorrect username or password');
        } else {
          res.locals.id = data.id;
          return next();
        }
      });
    })
    .catch((error) => {
      console.log('authController.postLogin: ERROR: ' + error);
      return res.status(401).json('incorrect username or password');
    });
};

// handle signup
authController.postSignup = (req, res, next) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(401).json('incorrect username or password');
  }
  User.create(req.body)
    .then((data) => {
      res.locals.id = data.id;
      return next();
    })
    .catch((error) => {
      if (error.code === 11000) {
        return res.status(409).json('username not available');
      }
      return next({
        log: 'authController.postSignup: ERROR: ' + error,
        message: 'authController.postSignup: ERROR: Could not create new user',
      });
    });
};

authController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id, { httpOnly: true, secure: true });
  return next();
};

authController.startSession = (req, res, next) => {
  Session.findOneAndUpdate({ cookieId: res.locals.id }, { cookieId: res.locals.id }, { new: true, upsert: true })
    .then(() => {
      return next();
    })
    .catch((error) => {
      return next({
        log: 'authController.startSession: ERROR: ' + error,
        message: 'authController.startSession: ERROR: Could not verify user is logged in',
      });
    });
};

authController.endSession = (req, res, next) => {
  console.log(req.cookies.ssid);
  Session.deleteOne({ cookieId: req.cookies.ssid })
    .then(() => {
      return next();
    })
    .catch((error) => {
      return next({
        log: 'authController.endSession: ERROR: ' + error,
        message: 'authController.endSession: ERROR: Could not logout user',
      });
    });
};

authController.checkAuth = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid })
    .exec()
    .then((data) => {
      if (!data) return res.status(401).json('not logged in');
      else return next();
    })
    .catch((error) => {
      return next({
        log: 'authController.startSession: ERROR: ' + error,
        message: 'authController.startSession: ERROR: Could not verify user is logged in',
      });
    });
};

authController.getUsername = (req, res, next) => {
  User.findOne({ _id: req.cookies.ssid })
    .exec()
    .then((data) => {
      res.locals.username = data.username;
      return next();
    })
    .catch((error) => {
      return next({
        log: 'authController.getUsername: ERROR: ' + error,
        message: 'authController.getUsername: ERROR: Could not find user info',
      });
    });
};

module.exports = authController;
