const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

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
