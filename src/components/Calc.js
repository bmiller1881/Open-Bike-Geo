import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Card, Button } from '@mui/material';

import CalcInput from './CalcInput';
import CalcValues from './CalcValues';
import LineGraph from './LineGraph';
import Schematic from './Schematic';

// custom hook for input boxes
function useInput(initialState) {
  const [state, setState] = useState(initialState);
  const onChange = (event) => {
    setState(Number(event.target.value));
  };
  return [state, setState, onChange];
}

function Calc(props) {
  const [wheelbase, setWheelbase, wheelbaseOnChange] = useInput(props.data.wheelbase.val);
  const [steeringAxisInclination, setSteeringAxisInclination, steeringAxisInclinationOnChange] = useInput(props.data.steeringAxisInclination.val);
  const [frontAxleOffset, setFrontAxleOffset, frontAxleOffsetOnChange] = useInput(props.data.frontAxleOffset.val);
  const [frontWheelRadius, setFrontWheelRadius, frontWheelRadiusOnChange] = useInput(props.data.frontWheelRadius.val);
  const [rearWheelRadius, setRearWheelRadius, rearWheelRadiusOnChange] = useInput(props.data.rearWheelRadius.val);
  const [handlebarRadius, setHandlebarRadius, handlebarRadiusOnChange] = useInput(props.data.handlebarRadius.val);
  const [massTotal, setMassTotal, massTotalOnChange] = useInput(props.data.massTotal.val);
  const [cgX, setCgX, cgXOnChange] = useInput(props.data.cgX.val);
  const [cgY, setCgY, cgYOnChange] = useInput(props.data.cgY.val);
  const [radiusGyration, setRadiusGyration] = useState(props.data.radiusGyration.val);
  const [gravConst, setGravConst] = useState(props.data.gravConst.val);
  const [trail, setTrail] = useState(props.data.trail.val);
  const [forkFlop, setForkFlop] = useState(props.data.forkFlop.val);
  const [k1, setK1] = useState(props.data.k1.val);
  const [k2, setK2] = useState(props.data.k2.val);
  const [k3, setK3] = useState(props.data.k3.val);
  const [k4, setK4] = useState(props.data.k4.val);
  const [graph, setGraph] = useState(props.data.graph);

  const stateObj = {
    id: props.data._id,
    user: props.data.user,
    name: props.data.name,
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

  const dimsObj = {
    wheelbase: wheelbase,
    steeringAxisInclination: steeringAxisInclination,
    frontAxleOffset: frontAxleOffset,
    frontWheelRadius: frontWheelRadius,
    rearWheelRadius: rearWheelRadius,
    handlebarRadius: handlebarRadius,
    cgX: cgX,
    cgY: cgY,
  };

  function mapDataToState(data) {
    setWheelbase(data.wheelbase.val);
    setSteeringAxisInclination(data.steeringAxisInclination.val);
    setFrontAxleOffset(data.frontAxleOffset.val);
    setFrontWheelRadius(data.frontWheelRadius.val);
    setRearWheelRadius(data.rearWheelRadius.val);
    setHandlebarRadius(data.handlebarRadius.val);
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
    setGraph(data.graph);
  }

  function putData() {
    fetch('/api', {
      method: 'PUT',
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
      .catch((error) => console.log('ERROR: could not put-fetch: ' + error));
  }

  function deleteData() {
    fetch('/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ id: props.data._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.delete();
      })
      .catch((error) => console.log('ERROR: could not delete-fetch: ' + error));
  }

  return (
    <>
      {/* <div className="calc-container">
        <h3 className="calc-title">
          Study Title: <em>{props.data.name}</em>
        </h3>
        <div className="calc-sub-container graph-container item-centered">
          <Schematic dims={dimsObj} />
        </div>
        <div className="calc-sub-container calc-input-container">
          <h4 className="calc-title">Input Bicycle Characteristics</h4>
          <CalcInput name="wheelbase" title="Wheelbase" value={wheelbase} onChange={wheelbaseOnChange} unit="m" />
          <CalcInput name="steeringAxisInclination" title="Steering Axis Inclination" value={steeringAxisInclination} onChange={steeringAxisInclinationOnChange} unit="deg" />
          <CalcInput name="frontAxleOffset" title="Front Axle Offset" value={frontAxleOffset} onChange={frontAxleOffsetOnChange} unit="m" />
          <CalcInput name="frontWheelRadius" title="Front Wheel Radius" value={frontWheelRadius} onChange={frontWheelRadiusOnChange} unit="m" />
          <CalcInput name="rearWheelRadius" title="Rear Wheel Radius" value={rearWheelRadius} onChange={rearWheelRadiusOnChange} unit="m" />
          <CalcInput name="handlebarRadius" title="Handlebar Radius" value={handlebarRadius} onChange={handlebarRadiusOnChange} unit="m" />
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
        <button className="calc-button" onClick={putData}>
          <strong>CALCULATE</strong>
        </button>
        <LineGraph data={graph} />
        <button className="delete-button" onClick={deleteData}>
          <strong>DELETE</strong>
        </button>
      </div> */}
      <Box sx={{ px: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', my: '2rem' }}>
          <Typography variant="h6" sx={{ mx: '1rem' }}>
            Study Title: <em>{props.data.name}</em>
          </Typography>
          <Button variant="contained" onClick={putData} sx={{ mx: '1rem' }}>
            CALCULATE
          </Button>
          <Button variant="contained" onClick={deleteData} sx={{ mx: '1rem' }}>
            DELETE
          </Button>
        </Box>
        <Box sx={{ mx: '1rem', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'rgb(255,255,255,.6)' }}>
            Schematic
          </Typography>
          <Schematic dims={dimsObj} />
        </Box>
        <Box sx={{ mx: '1rem', mb: '4rem', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'rgb(255,255,255,.6)' }}>
            Geometry
          </Typography>
          <CalcInput name="wheelbase" title="Wheelbase" value={wheelbase} onChange={wheelbaseOnChange} unit="m" min={0.2} max={2} step={0.05} />
          <CalcInput
            name="steeringAxisInclination"
            title="Steering Axis Inclination"
            value={steeringAxisInclination}
            onChange={steeringAxisInclinationOnChange}
            unit="deg"
            min={0}
            max={70}
            step={0.5}
          />
          <CalcInput name="frontAxleOffset" title="Front Axle Offset" value={frontAxleOffset} onChange={frontAxleOffsetOnChange} unit="m" min={0} max={0.5} step={0.005} />
          <CalcInput name="frontWheelRadius" title="Front Wheel Radius" value={frontWheelRadius} onChange={frontWheelRadiusOnChange} unit="m" min={0.05} max={1} step={0.01} />
          <CalcInput name="rearWheelRadius" title="Rear Wheel Radius" value={rearWheelRadius} onChange={rearWheelRadiusOnChange} unit="m" min={0.05} max={1} step={0.01} />
          <CalcInput name="handlebarRadius" title="Handlebar Radius" value={handlebarRadius} onChange={handlebarRadiusOnChange} unit="m" min={0} max={1} step={0.005} />
          <CalcInput name="massTotal" title="Mass Total" value={massTotal} onChange={massTotalOnChange} unit="kg" min={0} max={500} step={2} />
          <CalcInput name="cgX" title="Horizontal Center of Gravity" value={cgX} onChange={cgXOnChange} unit="m" min={0} max={2} step={0.01} />
          <CalcInput name="cgY" title="Vertical Center of Gravity" value={cgY} onChange={cgYOnChange} unit="m" min={0} max={4} step={0.01} />
        </Box>
        <Box sx={{ mx: '1rem', mb: '4rem', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'rgb(255,255,255,.6)' }}>
            Calculated Constants
          </Typography>
          <CalcInput name="radiusGyration" title="Radius of Gyration" value={radiusGyration} unit="m" disabled={true} />
          <CalcInput name="gravConst" title="Gravitational Constant" value={gravConst} unit="m/s^2" disabled={true} />
          <CalcInput name="trail" title="Trail" value={trail} unit="m" disabled={true} />
          <CalcInput name="forkFlop" title="Fork Flop" value={forkFlop} unit="N" disabled={true} />
          <CalcInput name="k1" title="k1" value={k1} unit="kg m^2/s^2" disabled={true} />
          <CalcInput name="k2" title="k2" value={k2} unit="kg" disabled={true} />
          <CalcInput name="k3" title="k3" value={k3} unit="m/N" disabled={true} />
          <CalcInput name="k4" title="k4" value={k4} unit="1/m" disabled={true} />
        </Box>
        <Box sx={{ minWidth: '400px', width: '1000px', textAlign: 'center' }}>
          <LineGraph data={graph} />
        </Box>
      </Box>
    </>
  );
}

export default Calc;
