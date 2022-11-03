import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

const Schematic = (props) => {
  props = props.dims;
  const scale = 300;
  const height = 1;
  const windowHeight = scale * height;

  const wheelbase = props.wheelbase * scale;
  const steeringAxisInclination = props.steeringAxisInclination;
  const frontAxleOffset = props.frontAxleOffset * scale;
  const frontWheelRadius = props.frontWheelRadius * scale;
  const rearWheelRadius = props.rearWheelRadius * scale;
  const handlebarRadius = props.handlebarRadius * scale;
  const cgX = props.cgX * scale;
  const cgY = props.cgY * scale;
  const forkHeight = cgY / 2;

  return (
    <Stage width={500} height={windowHeight}>
      <Layer>
        <Circle x={frontWheelRadius + 5} y={windowHeight - frontWheelRadius - 5} radius={frontWheelRadius} stroke="black" strokeWidth={4} />
        <Circle
          x={frontWheelRadius + 5 + wheelbase}
          y={windowHeight - rearWheelRadius - 5}
          radius={rearWheelRadius}
          stroke="black"
          strokeWidth={4}
        />
        <Line
          points={[
            frontWheelRadius + 5,
            windowHeight - frontWheelRadius - 5,
            frontWheelRadius + 5 + frontAxleOffset,
            windowHeight - frontWheelRadius - 5,
          ]}
          stroke="green"
          strokeWidth={4}
        />
        <Line
          points={[
            frontWheelRadius + 5 + frontAxleOffset,
            windowHeight - frontWheelRadius - 5,
            frontWheelRadius + 5 + frontAxleOffset + Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight,
            windowHeight - frontWheelRadius - 5 - Math.cos((steeringAxisInclination * Math.PI) / 180) * forkHeight,
          ]}
          stroke="green"
          strokeWidth={4}
        />
        <Line
          points={[
            frontWheelRadius + 5 + frontAxleOffset + Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight,
            windowHeight - frontWheelRadius - 5 - Math.cos((steeringAxisInclination * Math.PI) / 180) * forkHeight,
            frontWheelRadius - 10 + frontAxleOffset + Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight,
            windowHeight - frontWheelRadius - 10 - Math.cos((steeringAxisInclination * Math.PI) / 180) * forkHeight,
          ]}
          stroke="green"
          strokeWidth={4}
        />
        <Circle
          x={frontWheelRadius - 10 + frontAxleOffset + Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight}
          y={windowHeight - frontWheelRadius - 10 - Math.cos((steeringAxisInclination * Math.PI) / 180) * forkHeight}
          radius={5}
          fill="black"
          strokeWidth={4}
        />
        <Line
          points={[
            frontWheelRadius + 5 + frontAxleOffset + Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight,
            windowHeight - frontWheelRadius - 5 - Math.cos((steeringAxisInclination * Math.PI) / 180) * forkHeight,
            frontWheelRadius + 5 + wheelbase,
            windowHeight - rearWheelRadius - 5,
          ]}
          stroke="green"
          strokeWidth={4}
        />
        <Line
          points={[
            (frontWheelRadius +
              5 +
              frontAxleOffset +
              Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight +
              (frontWheelRadius + 5 + wheelbase)) /
              2,

            (windowHeight -
              frontWheelRadius -
              5 -
              Math.cos((steeringAxisInclination * Math.PI) / 180) * forkHeight +
              (windowHeight - rearWheelRadius - 5)) /
              2,
            (frontWheelRadius +
              5 +
              frontAxleOffset +
              Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight +
              (frontWheelRadius + 5 + wheelbase)) /
              2,
            (frontWheelRadius + 5 + wheelbase + windowHeight - rearWheelRadius - 5) / 2 - 250,
          ]}
          stroke="green"
          strokeWidth={4}
        />
        <Rect
          x={
            (frontWheelRadius +
              5 +
              frontAxleOffset +
              Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight +
              (frontWheelRadius + 5 + wheelbase)) /
              2 -
            25
          }
          y={(frontWheelRadius + 5 + wheelbase + windowHeight - rearWheelRadius - 5) / 2 - 250}
          width={35}
          height={5}
          fill="black"
        />
      </Layer>
    </Stage>
  );
};

export default Schematic;
