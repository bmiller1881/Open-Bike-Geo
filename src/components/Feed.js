import React, { useState } from 'react';
import Calc from './Calc';

function Feed(props) {
  const [calcList, setCalcList] = useState([]);
  const [inputName, setInputName] = useState('');

  function clickHandler() {
    setCalcList([<Calc key={'calc-' + calcList.length} name={inputName} />, ...calcList]);
    setInputName('');
  }
  return (
    <div id="feed">
      <input placeholder="enter project name" value={inputName} onChange={(event) => setInputName(event.target.value)} />
      <button className="save-button" onClick={clickHandler}>
        START NEW BIKE
      </button>
      {calcList}
    </div>
  );
}

export default Feed;
