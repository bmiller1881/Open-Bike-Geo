const { Geometry } = require('../util/geoCalc.js');

const dataController = {};

dataController.getInitialData = (req, res, next) => {
  const details = {
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
  res.locals.data = new Geometry(details);
  return next();
};

dataController.patchData = (req, res, next) => {
  res.locals.data = new Geometry(req.body);
  return next();
};

module.exports = dataController;
