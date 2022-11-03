const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const geoSchema = new Schema({
  user: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  wheelbase: { type: Schema.Types.Mixed, required: true },
  steeringAxisInclination: { type: Schema.Types.Mixed, required: true },
  frontAxleOffset: { type: Schema.Types.Mixed, required: true },
  frontWheelRadius: { type: Schema.Types.Mixed, required: true },
  rearWheelRadius: { type: Schema.Types.Mixed, required: true },
  handlebarRadius: { type: Schema.Types.Mixed, required: true },
  massTotal: { type: Schema.Types.Mixed, required: true },
  cgX: { type: Schema.Types.Mixed, required: true },
  cgY: { type: Schema.Types.Mixed, required: true },
  radiusGyration: { type: Schema.Types.Mixed, required: true },
  gravConst: { type: Schema.Types.Mixed, required: true },
  trail: { type: Schema.Types.Mixed, required: true },
  forkFlop: { type: Schema.Types.Mixed, required: true },
  k1: { type: Schema.Types.Mixed, required: true },
  k2: { type: Schema.Types.Mixed, required: true },
  k3: { type: Schema.Types.Mixed, required: true },
  k4: { type: Schema.Types.Mixed, required: true },
  graph: { type: Array, required: true },
});

const Geo = mongoose.model('geo', geoSchema);

module.exports = { Geo };
