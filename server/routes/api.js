const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.get('/', dataController.getInitialData, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.patch('/', dataController.patchData, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.patch('/', dataController.patchData, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;
