import React, { useState, useEffect } from 'react';
import CalcLocked from './CalcLocked';

function PublicFeed(props) {
  const [calcList, setCalcList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        const calcListAdd = [];
        data.reverse().forEach((geo) => {
          calcListAdd.push(<CalcLocked key={geo._id} data={geo} />);
        });
        setCalcList([calcListAdd, ...calcList]);
      })
      .catch((error) => console.log('ERROR: could not get-fetch: ' + error));
  }

  return (
    <div className="main-container">
      <div className="calc-container">
        <h2 className="main-title">Public Studies</h2>
      </div>
      {calcList}
    </div>
  );
}

export default PublicFeed;
