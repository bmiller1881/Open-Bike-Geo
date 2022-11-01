import React from 'react';

function CalcValues(props) {
  return (
    <div className={'calc-value'}>
      <label htmlFor={props.name}>{props.title}: </label>
      {/* <p name={props.name}>{props.value}</p> */}
      <input className="m-10 input-1" name={props.name} value={props.value} disabled />
      <input className="m-10 input-3" defaultValue={props.unit} disabled />
    </div>
  );
}

export default CalcValues;
