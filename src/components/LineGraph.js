import React from 'react';
import { ResponsiveContainer, LineChart, Line, ReferenceLine, CartesianGrid, XAxis, YAxis } from 'recharts';

// function LineGraph(props) {
//   return (

//   )
// }

function LineGraph(props) {
  // const xPoints = [];
  // for (let i = 0; i <= 40; i++) {
  //   xPoints.push(i / 2);
  // }
  return (
    <>
      <div className="calc-sub-container graph-container">
        <h4 className="calc-title">Variation of Control Spring w/ Velocity</h4>
        <ResponsiveContainer height={300} width="100%">
          <LineChart data={props.data} margin={{ top: 20, right: 50, left: 0, bottom: 20 }}>
            <Line type="natural" dataKey="controlSpring" dot={false} strokeWidth={3} stroke="green" isAnimationActive={false} />
            <ReferenceLine
              stroke="red"
              strokeDasharray="3 3"
              strokeWidth={3}
              segment={[
                { x: '0', y: 7 },
                { x: '6', y: 0 },
              ]}
            />
            <CartesianGrid stroke="rgb(230,230,230)" />
            <XAxis dataKey="velocity" tick={{ fontSize: 12 }} label={{ value: 'velocity [m/s]', position: 'insideBottom', offset: -15 }} />
            <YAxis
              type="number"
              tickCount={10}
              label={{ value: 'control spring [Nm/rad]', angle: -90, position: 'insideBottomLeft', offset: 20 }}
              tick={{ fontSize: 12 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="calc-sub-container graph-container">
        <h4 className="calc-title">Variation of Sensitivity w/ Velocity</h4>
        <ResponsiveContainer height={300} width="100%">
          <LineChart data={props.data} margin={{ top: 20, right: 50, left: 0, bottom: 20 }}>
            <Line type="natural" dataKey="controlSensitivity" dot={false} strokeWidth={3} stroke="green" isAnimationActive={false} />
            <ReferenceLine stroke="red" strokeDasharray="3 3" strokeWidth={3} y={25} />
            <CartesianGrid stroke="rgb(230,230,230)" />
            <XAxis dataKey="velocity" tick={{ fontSize: 12 }} label={{ value: 'velocity [m/s]', position: 'insideBottom', offset: -15 }} />
            <YAxis
              type="number"
              tickCount={10}
              label={{ value: 'control spring [Nm/rad]', angle: -90, position: 'insideBottomLeft', offset: 20 }}
              tick={{ fontSize: 12 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default LineGraph;
