import React from 'react';

function CalcInput(props) {
  return (
    <div className={'calc-input'}>
      <label htmlFor={props.name}>{props.title}: </label>
      <input
        className="m-10-left input-1"
        type="number"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      <input className="m-10-left input-2" defaultValue={props.unit} disabled />
    </div>
  );
}

export default CalcInput;
