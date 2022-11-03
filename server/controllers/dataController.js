const { Geometry } = require('../util/geoCalc.js');
const { Geo } = require('../models/dataModel');

const dataController = {};

// find all Geo's
dataController.getData = (req, res, next) => {
  Geo.find({})
    .exec()
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((error) => {
      return next({
        log: 'dataController.getData: ERROR: ' + error,
        message: 'dataController.getData: ERROR: Could not find data',
      });
    });
};

// find only User Geo's
dataController.getUserData = (req, res, next) => {
  Geo.find({ userId: req.cookies.ssid })
    .exec()
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((error) => {
      return next({
        log: 'dataController.getUserData: ERROR: ' + error,
        message: 'dataController.getUserData: ERROR: Could not find data',
      });
    });
};

// create new Geo
dataController.postData = (req, res, next) => {
  const defaultData = {
    wheelbase: 1,
    steeringAxisInclination: 18,
    frontAxleOffset: 0.025,
    frontWheelRadius: 0.3,
    rearWheelRadius: 0.3,
    handlebarRadius: 0.3,
    massTotal: 100,
    cgX: 0.4,
    cgY: 1.2,
  };
  const geo = new Geometry(defaultData);
  // geo.user = req.body.user;
  geo.name = req.body.name;
  geo.userId = req.cookies.ssid;
  Geo.create(geo)
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((error) => {
      return next({
        log: 'dataController.postData: ERROR: ' + error,
        message: 'dataController.postData: ERROR: Could not create new data',
      });
    });
};

dataController.deleteData = (req, res, next) => {
  console.log(req.body.id);
  Geo.deleteOne({ _id: req.body.id })
    .exec()
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((error) => {
      return next({
        log: 'dataController.deleteData: ERROR: ' + error,
        message: 'dataController.deleteData: ERROR: Could not delete data',
      });
    });
};

dataController.putData = (req, res, next) => {
  const geo = new Geometry(req.body);
  geo.user = req.body.user;
  geo.name = req.body.name;
  geo.userId = req.cookies.ssid;
  res.locals.data = geo;
  Geo.findOneAndReplace({ _id: req.body.id }, geo)
    .exec()
    .then(() => {
      return next();
    })
    .catch((error) => {
      return next({
        log: 'dataController.putData: ERROR: ' + error,
        message: 'dataController.putData: ERROR: Could not update data',
      });
    });
};

module.exports = dataController;
