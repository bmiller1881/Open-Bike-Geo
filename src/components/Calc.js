import React, { useState, useEffect } from 'react';
import CalcInput from './CalcInput';
import CalcValues from './CalcValues';

// custom hook for input boxes
function useInput(initialState) {
  const [state, setState] = useState(initialState);
  const onChange = (event) => {
    setState(Number(event.target.value));
  };
  return [state, setState, onChange];
}

function Calc(props) {
  const [wheelbase, setWheelbase, wheelbaseOnChange] = useInput(0);
  const [steeringAxisInclination, setSteeringAxisInclination, steeringAxisInclinationOnChange] = useInput(0);
  const [frontAxleOffset, setFrontAxleOffset, frontAxleOffsetOnChange] = useInput(0);
  const [frontWheelRadius, setFrontWheelRadius, frontWheelRadiusOnChange] = useInput(0);
  const [rearWheelRadius, setRearWheelRadius, rearWheelRadiusOnChange] = useInput(0);
  const [handlebarRadius, setHandlebarRadius, handlebarRadiusOnChange] = useInput(0);
  const [massTotal, setMassTotal, massTotalOnChange] = useInput(0);
  const [cgX, setCgX, cgXOnChange] = useInput(0);
  const [cgY, setCgY, cgYOnChange] = useInput(0);
  const [radiusGyration, setRadiusGyration] = useState(0);
  const [gravConst, setGravConst] = useState(0);
  const [trail, setTrail] = useState(0);
  const [forkFlop, setForkFlop] = useState(0);
  const [k1, setK1] = useState(0);
  const [k2, setK2] = useState(0);
  const [k3, setK3] = useState(0);
  const [k4, setK4] = useState(0);
  const [graph, setGraph] = useState(0);

  const stateObj = {
    wheelbase,
    steeringAxisInclination,
    frontAxleOffset,
    frontWheelRadius,
    rearWheelRadius,
    handlebarRadius,
    massTotal,
    cgX,
    cgY,
  };

  function mapDataToState(data) {
    setWheelbase(data.wheelbase.val);
    setSteeringAxisInclination(data.steeringAxisInclination.val);
    setFrontAxleOffset(data.frontWheelRadius.val);
    setFrontWheelRadius(data.rearWheelRadius.val);
    setRearWheelRadius(data.handlebarRadius.val);
    setHandlebarRadius(data.wheelbase.val);
    setMassTotal(data.massTotal.val);
    setCgX(data.cgX.val);
    setCgY(data.cgY.val);
    setRadiusGyration(data.radiusGyration.val);
    setGravConst(data.gravConst.val);
    setTrail(data.trail.val);
    setForkFlop(data.forkFlop.val);
    setK1(data.k1.val);
    setK2(data.k2.val);
    setK3(data.k3.val);
    setK4(data.k4.val);
  }

  function getData() {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        mapDataToState(data);
      })
      .catch((error) => console.log('ERROR: get-fetch data from /api: ' + error));
  }

  function patchData() {
    fetch('/api', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(stateObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        mapDataToState(data);
      })
      .catch((error) => console.log('ERROR: post-fetch data from /api: ' + error));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="calc-container">
        <h3 className="calc-title">Calculate Bicycle Handling Characteristics</h3>
        <div className="calc-sub-container calc-input-container">
          <h4 className="calc-title">Input Bicycle Characteristics</h4>
          <CalcInput name="wheelbase" title="Wheelbase" value={wheelbase} onChange={wheelbaseOnChange} unit="m" />
          <CalcInput
            name="steeringAxisInclination"
            title="Steering Axis Inclination"
            value={steeringAxisInclination}
            onChange={steeringAxisInclinationOnChange}
            unit="deg"
          />
          <CalcInput name="frontAxleOffset" title="Front Axle Offset" value={frontAxleOffset} onChange={frontAxleOffsetOnChange} unit="m" />
          <CalcInput
            name="frontWheelRadius"
            title="Front Wheel Radius"
            value={frontWheelRadius}
            onChange={frontWheelRadiusOnChange}
            unit="m"
          />
          <CalcInput name="rearWheelRadius" title="Rear Wheel Radius" value={rearWheelRadius} onChange={rearWheelRadiusOnChange} unit="m" />
          <CalcInput
            name="handlebarRadius"
            title="Handlebar Wheel Radius"
            value={handlebarRadius}
            onChange={handlebarRadiusOnChange}
            unit="m"
          />
          <CalcInput name="massTotal" title="Mass Total" value={massTotal} onChange={massTotalOnChange} unit="kg" />
          <CalcInput name="cgX" title="Horizontal Center of Gravity" value={cgX} onChange={cgXOnChange} unit="m" />
          <CalcInput name="cgY" title="Vertical Center of Gravity" value={cgY} onChange={cgYOnChange} unit="m" />
        </div>
        <div className="calc-sub-container calc-value-container">
          <h4 className="calc-title">Calculated Values</h4>
          <CalcValues name="radiusGyration" title="Radius of Gyration" value={radiusGyration} unit="m" />
          <CalcValues name="gravConst" title="Gravitational Constant" value={gravConst} unit="m/s^2" />
          <CalcValues name="trail" title="Trail" value={trail} unit="m" />
          <CalcValues name="forkFlop" title="Fork Flop" value={forkFlop} unit="N" />
          <CalcValues name="k1" title="k1" value={k1} unit="kg m^2/s^2" />
          <CalcValues name="k2" title="k2" value={k2} unit="kg" />
          <CalcValues name="k3" title="k3" value={k3} unit="m/N" />
          <CalcValues name="k4" title="k4" value={k4} unit="1/m" />
        </div>
        <button className="reset-button" onClick={getData}>
          <strong>RESET</strong>
        </button>
        <button className="calc-button" onClick={patchData}>
          <strong>CALCULATE</strong>
        </button>
      </div>
    </div>
  );
}

export default Calc;
