// create class for Characteristic, including dimensions and calcs
class Characteristic {
  constructor(variable, unit, value, unit2, value2) {
    this.var = variable;
    this.unit = unit;
    this.val = value;
    this.unit2 = unit2;
    this.val2 = value2;
  }
}

// create class for Geometry which includes many Characteristics
class Geometry {
  constructor(details) {
    const {
      wheelbase,
      steeringAxisInclination,
      frontAxleOffset,
      frontWheelRadius,
      rearWheelRadius,
      handlebarRadius,
      massTotal,
      cgX,
      cgY,
      radiusGyration,
    } = details;

    // characteristics
    this.wheelbase = new Characteristic('A', 'm', wheelbase);
    this.steeringAxisInclination = this.#degToRad(new Characteristic('B', 'deg', steeringAxisInclination));
    this.frontAxleOffset = new Characteristic('e', 'm', frontAxleOffset);
    this.frontWheelRadius = new Characteristic('rf', 'm', frontWheelRadius);
    this.rearWheelRadius = new Characteristic('rr', 'm', rearWheelRadius);
    this.handlebarRadius = new Characteristic('rh', 'm', handlebarRadius);
    this.massTotal = new Characteristic('m', 'kg', massTotal);
    this.cgX = new Characteristic('X', 'm', cgX);
    this.cgY = new Characteristic('Y', 'm', cgY);
    this.radiusGyration = new Characteristic('kx', 'm', 0.36);
    this.gravConst = new Characteristic('g', 'm/s^2', 9.81);
    this.trail = this.#calcTrail();
    this.forkFlop = this.#calcForkFlop();
    this.k1 = this.#calcK1();
    this.k2 = this.#calcK2();
    this.k3 = new Characteristic('K3', 'm/N', 1 / 1500);
    this.k4 = this.#calcK4();
    this.graph = this.#calcGraph();
  }

  // unit converters

  #degToRad(measurement) {
    measurement.val2 = (measurement.val * Math.PI) / 180;
    measurement.unit2 = 'rad';
    return measurement;
  }

  // calcs

  #calcTrail() {
    const value =
      (this.frontWheelRadius.val * Math.sin(this.steeringAxisInclination.val2) - this.frontAxleOffset.val) /
      Math.cos(this.steeringAxisInclination.val2);
    return new Characteristic('T', 'm', value);
  }

  #calcForkFlop() {
    const value =
      (this.trail.val * Math.cos(this.steeringAxisInclination.val2) * this.cgX.val * this.massTotal.val * this.gravConst.val) /
      (this.wheelbase.val * this.handlebarRadius.val);
    return new Characteristic('FF', 'N', value);
  }

  #calcK1() {
    const value =
      ((this.massTotal.val * this.gravConst.val * this.cgX.val * this.trail.val * Math.cos(this.steeringAxisInclination.val2)) /
        this.wheelbase.val) *
      (Math.sin(this.steeringAxisInclination.val2) -
        (this.cgY.val * this.trail.val * this.cgX.val) /
          (this.wheelbase.val * (Math.pow(this.cgY.val, 2) + Math.pow(this.radiusGyration.val, 2))));
    return new Characteristic('K1', 'kg m^2/s^2', value);
  }

  #calcK2() {
    const value =
      (this.trail.val *
        Math.pow(Math.cos(this.steeringAxisInclination.val2), 2) *
        this.massTotal.val *
        this.cgX.val *
        Math.pow(this.radiusGyration.val, 2)) /
      ((Math.pow(this.cgY.val, 2) + Math.pow(this.radiusGyration.val, 2)) * Math.pow(this.wheelbase.val, 2));
    return new Characteristic('K2', 'kg', value);
  }

  #calcK4() {
    const value = (this.cgX.val * Math.cos(this.steeringAxisInclination.val2)) / (this.cgY.val * this.wheelbase.val);
    return new Characteristic('K4', '1/m', value);
  }

  #calcControlSpring(velocity) {
    return this.k1.val - this.k2.val * Math.pow(velocity, 2);
  }

  #calcControlSensitivity(velocity, controlSpringCurr) {
    return (this.k4.val * velocity) / (this.handlebarRadius.val + (this.k3.val * -controlSpringCurr) / this.handlebarRadius.val);
  }

  #calcGraph() {
    const graph = [];
    let velocity = 0;
    while (velocity <= 20) {
      const controlSpringCurr = this.#calcControlSpring(velocity);
      const controlSensitivityCurr = this.#calcControlSensitivity(velocity, controlSpringCurr);
      graph.push({ velocity: velocity, controlSpring: controlSpringCurr, controlSensitivity: controlSensitivityCurr });
      velocity += 0.5;
    }
    return graph;
  }
}

module.exports = { Geometry };
