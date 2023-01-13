import React from 'react';
import { Box, TextField, Typography, Card, Button } from '@mui/material';
import { ResponsiveContainer, ReferenceLine, CartesianGrid, XAxis, YAxis, ScatterChart, Scatter, Tooltip } from 'recharts';

function LineGraph(props) {
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ color: 'rgb(255,255,255,.6)' }}>
          Variation of Control Spring w/ Velocity
        </Typography>
        <ResponsiveContainer height={250} width="100%">
          <ScatterChart margin={{ top: 20, right: 50, left: 0, bottom: 20 }}>
            <ReferenceLine stroke="black" strokeWidth={2} y={0} />
            <CartesianGrid stroke="rgb(230,230,230)" />
            <XAxis type="number" dataKey="velocity" domain={[0, 20]} tick={{ fontSize: 12 }} label={{ value: 'velocity [m/s]', position: 'insideBottom', offset: -15, fill: 'rgb(255,255,255,.6)' }} />
            <YAxis
              type="number"
              dataKey="controlSpring"
              tick={{ fontSize: 12 }}
              label={{ value: 'control spring [Nm/rad]', angle: -90, position: 'insideBottomLeft', offset: 20, fill: 'rgb(255,255,255,.6)' }}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={props.data} fill="rgb(27, 40, 178)" line />
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ my: '2rem' }}>
        <Typography variant="h6" sx={{ color: 'rgb(255,255,255,.6)' }}>
          Variation of Sensitivity w/ Velocity
        </Typography>
        <ResponsiveContainer height={250} width="100%">
          <ScatterChart margin={{ top: 20, right: 50, left: 0, bottom: 20 }}>
            <CartesianGrid stroke="rgb(230,230,230)" />
            <XAxis type="number" dataKey="velocity" domain={[0, 20]} tick={{ fontSize: 12 }} label={{ value: 'velocity [m/s]', position: 'insideBottom', offset: -15, fill: 'rgb(255,255,255,.6)' }} />
            <YAxis
              type="number"
              dataKey="controlSensitivity"
              tick={{ fontSize: 12 }}
              label={{ value: 'control spring [rad/s/m]', angle: -90, position: 'insideBottomLeft', offset: 20, fill: 'rgb(255,255,255,.6)' }}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={props.data} fill="rgb(140, 0, 12)" line />
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}

export default LineGraph;
