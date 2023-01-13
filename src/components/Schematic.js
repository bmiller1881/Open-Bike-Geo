import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

const Schematic = (props) => {
  // handle schematic proportions
  props = props.dims;
  const scale = 400;
  const windowHeight = 400;
  const windowWidth = 500;
  const sc = 0.6;
  const offsetY = windowHeight - windowHeight / sc;

  const wheelbase = props.wheelbase * scale;
  const steeringAxisInclination = props.steeringAxisInclination;
  const frontAxleOffset = props.frontAxleOffset * scale;
  const frontWheelRadius = props.frontWheelRadius * scale;
  const rearWheelRadius = props.rearWheelRadius * scale;
  const handlebarRadius = props.handlebarRadius * scale;
  const cgX = props.cgX * scale;
  const cgY = props.cgY * scale;
  const forkHeight = cgY / 2;
  const headTubeHeight = scale / 12;
  const stemHeight = scale / 30;
  const stemLength = [scale / 30, scale / 30];
  const seatTube = frontWheelRadius * 2;
  const seatPostHeight = cgY * 0.75;
  const seatWidth = [scale / 10, scale / 16];
  const crankLength = [scale / 10, scale / 14];
  const pedalLength = scale / 30;

  // important points
  const edgeSpacing = [20, 25];
  const frontAxlePt = [frontWheelRadius + edgeSpacing[0], windowHeight - frontWheelRadius - edgeSpacing[1]];
  const rearAxlePt = [frontAxlePt[0] + Math.sqrt(wheelbase ** 2 - Math.abs(frontWheelRadius - rearWheelRadius) ** 2), windowHeight - rearWheelRadius - edgeSpacing[1]];
  const frontAxleOffsetPt = [frontAxlePt[0] + frontAxleOffset, frontAxlePt[1]];
  const bottomHeadTubePt = [
    frontAxleOffsetPt[0] + Math.sin((steeringAxisInclination * Math.PI) / 180) * forkHeight,
    frontAxleOffsetPt[1] - Math.cos((steeringAxisInclination * Math.PI) / 180) * forkHeight,
  ];
  const midHeadTubePt = [
    frontAxleOffsetPt[0] + Math.sin((steeringAxisInclination * Math.PI) / 180) * (forkHeight + headTubeHeight / 2),
    frontAxleOffsetPt[1] - Math.cos((steeringAxisInclination * Math.PI) / 180) * (forkHeight + headTubeHeight / 2),
  ];
  const topHeadTubePt = [
    frontAxleOffsetPt[0] + Math.sin((steeringAxisInclination * Math.PI) / 180) * (forkHeight + headTubeHeight),
    frontAxleOffsetPt[1] - Math.cos((steeringAxisInclination * Math.PI) / 180) * (forkHeight + headTubeHeight),
  ];
  const stemBasePt = [
    frontAxleOffsetPt[0] + Math.sin((steeringAxisInclination * Math.PI) / 180) * (forkHeight + headTubeHeight + stemHeight),
    frontAxleOffsetPt[1] - Math.cos((steeringAxisInclination * Math.PI) / 180) * (forkHeight + headTubeHeight + stemHeight),
  ];
  const stemEndPt = [stemBasePt[0] - stemLength[0], stemBasePt[1] - stemLength[1]];
  const bbPt = [rearAxlePt[0] - cgX, frontAxlePt[1]];
  const seatTubePt = [bbPt[0], windowHeight - seatTube];
  const seatPostStartPt = [bbPt[0], windowHeight - seatTube - 20];
  const seatPostEndPt = [bbPt[0], windowHeight - seatPostHeight];
  const seatFront = [seatPostEndPt[0] - seatWidth[0] / 2, seatPostEndPt[1]];
  const seatEnd = [seatPostEndPt[0] + seatWidth[1] / 2, seatPostEndPt[1]];

  // let windowWidth = wheelbase + frontWheelRadius + rearWheelRadius + edgeSpacing[0] * 2;
  // if (windowWidth >= 600) {
  //   windowWidth = 600;
  // }
  // const windowWidth = 500;

  const colors = {
    seat: 'rgb(140, 0, 82)',
    crank: 'darkgrey',
    pedal: 'rgb(80, 80, 80)',
    wheel: 'black',
    fork: 'rgb(144, 73, 242)',
    stem: 'rgb(115, 255, 174)',
    seatPost: 'darkgrey',
    frame: 'rgb(204, 85, 0)',
    seatTube: 'rgb(204, 85, 0)',
    headTube: 'rgb(204, 85, 0)',
  };

  const stroke = {
    seat: 10,
    crank: 10,
    pedal: 6,
    wheel: 16,
    fork: 8,
    stem: 8,
    seatPost: 6,
    frame: 8,
    seatTube: 8,
    headTube: 10,
  };

  const stroke1 = 8;
  const stroke2 = 16;
  const stroke3 = 10;
  const stroke4 = 1;
  const stroke5 = 6;

  return (
    <>
      <Stage width={windowWidth} height={windowHeight}>
        <Layer>
          <Rect x={0} y={0} width={windowWidth} height={windowHeight} cornerRadius={6} fill="rgb(255,255,255,.05)" />
        </Layer>
        <Layer scale={{ x: sc, y: sc }} offsetY={offsetY}>
          <Line
            name="crankRight"
            points={[bbPt[0], bbPt[1], bbPt[0] + crankLength[0], bbPt[1] - crankLength[1]]}
            stroke={colors.crank}
            strokeWidth={stroke3}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Line
            name="pedalRight"
            points={[
              bbPt[0] + crankLength[0] - pedalLength,
              bbPt[1] - crankLength[1],
              bbPt[0] + crankLength[0],
              bbPt[1] - crankLength[1],
              bbPt[0] + crankLength[0] + pedalLength,
              bbPt[1] - crankLength[1],
            ]}
            stroke={colors.pedal}
            strokeWidth={stroke.pedal}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Circle
            name="frontWheel"
            x={frontAxlePt[0]}
            y={frontAxlePt[1]}
            radius={frontWheelRadius}
            stroke={colors.wheel}
            strokeWidth={stroke.wheel}
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Circle
            name="rearWheel"
            x={rearAxlePt[0]}
            y={rearAxlePt[1]}
            radius={rearWheelRadius}
            stroke={colors.wheel}
            strokeWidth={stroke.wheel}
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Circle x={frontAxlePt[0]} y={frontAxlePt[1]} radius={10} stroke="lightgrey" fill="lightgrey" strokeWidth={stroke4} shadowBlur={10} shadowOffset={{ x: 5, y: 5 }} shadowOpacity={0.5} />
          <Circle x={rearAxlePt[0]} y={rearAxlePt[1]} radius={10} stroke="lightgrey" fill="lightgrey" strokeWidth={stroke4} shadowBlur={10} shadowOffset={{ x: 5, y: 5 }} shadowOpacity={0.5} />
          <Line
            name="fork"
            points={[frontAxlePt[0], frontAxlePt[1], frontAxleOffsetPt[0], frontAxleOffsetPt[1], bottomHeadTubePt[0], bottomHeadTubePt[1]]}
            stroke={colors.fork}
            strokeWidth={stroke.fork}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Line
            name="stem"
            points={[topHeadTubePt[0], topHeadTubePt[1], stemBasePt[0], stemBasePt[1], stemEndPt[0], stemEndPt[1]]}
            stroke={colors.stem}
            strokeWidth={stroke.stem}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Circle x={stemEndPt[0]} y={stemEndPt[1]} radius={5} stroke="black" fill="black" strokeWidth={stroke4} shadowBlur={10} shadowOffset={{ x: 5, y: 5 }} shadowOpacity={0.5} />
          <Line
            name="seatPost"
            points={[seatTubePt[0], seatTubePt[1], seatPostEndPt[0], seatPostEndPt[1]]}
            stroke={colors.seatPost}
            strokeWidth={stroke.seatPost}
            lineJoin="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Line
            name="seatTube"
            points={[bbPt[0], bbPt[1], seatTubePt[0], seatTubePt[1], seatPostStartPt[0], seatPostStartPt[1]]}
            stroke={colors.seatTube}
            strokeWidth={stroke.seatTube}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Line
            name="frame"
            points={[midHeadTubePt[0], midHeadTubePt[1], seatTubePt[0], seatTubePt[1], rearAxlePt[0], rearAxlePt[1], bbPt[0], bbPt[1], midHeadTubePt[0], midHeadTubePt[1]]}
            stroke={colors.frame}
            strokeWidth={stroke.frame}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Line
            name="headTube"
            points={[bottomHeadTubePt[0], bottomHeadTubePt[1], topHeadTubePt[0], topHeadTubePt[1]]}
            stroke={colors.headTube}
            strokeWidth={stroke.headTube}
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Line
            name="seat"
            points={[seatEnd[0], seatEnd[1], seatPostEndPt[0], seatPostEndPt[1], seatFront[0], seatFront[1]]}
            stroke={colors.seat}
            strokeWidth={stroke.seat}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Line
            name="crankLeft"
            points={[bbPt[0], bbPt[1], bbPt[0] - crankLength[0], bbPt[1] + crankLength[1]]}
            stroke={colors.crank}
            strokeWidth={stroke.crank}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
          <Line
            name="pedalLeft"
            points={[
              bbPt[0] - crankLength[0] - pedalLength,
              bbPt[1] + crankLength[1],
              bbPt[0] - crankLength[0],
              bbPt[1] + crankLength[1],
              bbPt[0] - crankLength[0] + pedalLength,
              bbPt[1] + crankLength[1],
            ]}
            stroke={colors.pedal}
            strokeWidth={stroke.pedal}
            lineJoin="round"
            lineCap="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
          />
        </Layer>
      </Stage>
    </>
  );
};

export default Schematic;
