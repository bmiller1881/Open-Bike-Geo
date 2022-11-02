const { Geometry } = require('../util/geoCalc.js');
const { Geo } = require('../models/dataModel');

const dataController = {};

dataController.getInitialData = (req, res, next) => {
  const defaultData = {
    wheelbase: 0.76,
    steeringAxisInclination: 15.5,
    frontAxleOffset: 0.075,
    frontWheelRadius: 0.37,
    rearWheelRadius: 0.245,
    handlebarRadius: 0.275,
    massTotal: 70,
    cgX: 0.33,
    cgY: 1.08,
  };
  const geo = new Geometry(defaultData);
  geo.user = 'test';
  Geo.create(geo)
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((error) => {
      return next({
        log: 'dataController.getInitialData: ERROR: ' + error,
        message: 'dataController.getInitialData: ERROR: Could not create new bike',
      });
    });
  // res.locals.data = new Geometry(defaultData);
  // return next();
};

dataController.patchData = (req, res, next) => {
  res.locals.data = new Geometry(req.body);
  return next();
};

module.exports = dataController;
