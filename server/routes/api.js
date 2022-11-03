const express = require('express');
const dataController = require('../controllers/dataController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.postLogin, authController.setSSIDCookie, authController.startSession, (req, res) => {
  res.status(200).json('logged in');
});

router.post('/signup', authController.postSignup, authController.setSSIDCookie, authController.startSession, (req, res) => {
  res.status(200).json('signed up');
});

router.get('/user/auth', authController.checkAuth, authController.getUsername, (req, res) => {
  res.status(200).json(res.locals.username);
});

router.delete('/user/auth', authController.endSession, (req, res) => {
  res.status(200).json('logged out');
});

router.get('/user', authController.checkAuth, dataController.getUserData, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.get('/', dataController.getData, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post('/', dataController.postData, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.put('/', dataController.putData, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.delete('/', dataController.deleteData, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;
