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

  return (
    <Box sx={{ px: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', mb: '1rem' }}>
        Study Title: <em>{props.data.name}</em>
      </Typography>
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
        <CalcInput name="wheelbase" title="Wheelbase" value={wheelbase} onChange={wheelbaseOnChange} unit="m" disabled={true} />
        <CalcInput name="steeringAxisInclination" title="Steering Axis Inclination" value={steeringAxisInclination} onChange={steeringAxisInclinationOnChange} unit="deg" disabled={true} />
        <CalcInput name="frontAxleOffset" title="Front Axle Offset" value={frontAxleOffset} onChange={frontAxleOffsetOnChange} unit="m" disabled={true} />
        <CalcInput name="frontWheelRadius" title="Front Wheel Radius" value={frontWheelRadius} onChange={frontWheelRadiusOnChange} unit="m" disabled={true} />
        <CalcInput name="rearWheelRadius" title="Rear Wheel Radius" value={rearWheelRadius} onChange={rearWheelRadiusOnChange} unit="m" disabled={true} />
        <CalcInput name="handlebarRadius" title="Handlebar Radius" value={handlebarRadius} onChange={handlebarRadiusOnChange} unit="m" disabled={true} />
        <CalcInput name="massTotal" title="Mass Total" value={massTotal} onChange={massTotalOnChange} unit="kg" disabled={true} />
        <CalcInput name="cgX" title="Horizontal Center of Gravity" value={cgX} onChange={cgXOnChange} unit="m" disabled={true} />
        <CalcInput name="cgY" title="Vertical Center of Gravity" value={cgY} onChange={cgYOnChange} unit="m" disabled={true} />
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
  );
}

export default Calc;
