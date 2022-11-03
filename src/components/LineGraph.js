import React from 'react';
import { ResponsiveContainer, ReferenceLine, CartesianGrid, XAxis, YAxis, ScatterChart, Scatter, Tooltip } from 'recharts';

function LineGraph(props) {
  return (
    <>
      <div className="calc-sub-container graph-container">
        <h4 className="calc-title">Variation of Control Spring w/ Velocity</h4>
        <ResponsiveContainer height={250} width="100%">
          <ScatterChart margin={{ top: 20, right: 50, left: 0, bottom: 20 }}>
            <ReferenceLine stroke="black" strokeWidth={2} y={0} />
            <CartesianGrid stroke="rgb(230,230,230)" />
            <XAxis
              type="number"
              dataKey="velocity"
              domain={[0, 20]}
              tick={{ fontSize: 12 }}
              label={{ value: 'velocity [m/s]', position: 'insideBottom', offset: -15 }}
            />
            <YAxis
              type="number"
              dataKey="controlSpring"
              tick={{ fontSize: 12 }}
              label={{ value: 'control spring [Nm/rad]', angle: -90, position: 'insideBottomLeft', offset: 20 }}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={props.data} fill="#82b74b" line />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="calc-sub-container graph-container">
        <h4 className="calc-title">Variation of Sensitivity w/ Velocity</h4>
        <ResponsiveContainer height={250} width="100%">
          <ScatterChart margin={{ top: 20, right: 50, left: 0, bottom: 20 }}>
            <CartesianGrid stroke="rgb(230,230,230)" />
            <XAxis
              type="number"
              dataKey="velocity"
              domain={[0, 20]}
              tick={{ fontSize: 12 }}
              label={{ value: 'velocity [m/s]', position: 'insideBottom', offset: -15 }}
            />
            <YAxis
              type="number"
              dataKey="controlSensitivity"
              tick={{ fontSize: 12 }}
              label={{ value: 'control spring [rad/s/m]', angle: -90, position: 'insideBottomLeft', offset: 20 }}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={props.data} fill="#82b74b" line />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default LineGraph;
