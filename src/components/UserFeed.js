import React, { useState, useEffect } from 'react';
import Calc from './Calc';
import { useNavigate } from 'react-router-dom';

function UserFeed(props) {
  const navigate = useNavigate();
  const [calcList, setCalcList] = useState([]);
  const [inputName, setInputName] = useState('');
  let renderPage;

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch('/api/user')
      .then((res) => {
        if (res.status === 401) navigate('/login');
        return res.json();
      })
      .then((data) => {
        const calcListAdd = [];
        data.reverse().forEach((geo) => {
          calcListAdd.push(<Calc key={geo._id} data={geo} delete={getData} />);
        });
        renderPage = (
          <div className="main-container">
            <div className="calc-container">
              <input
                className="new-input"
                placeholder="enter project name"
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
              />
              <button className="new-button" onClick={postData}>
                CREATE NEW STUDY
              </button>
            </div>
            {calcList}
          </div>
        );
        setCalcList([calcListAdd, ...calcList]);
      })
      .catch((error) => console.log('ERROR: could not get-fetch: ' + error));
  }

  function postData() {
    if (inputName === '') return;
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ name: inputName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCalcList([<Calc key={data._id} data={data} delete={getData} />, ...calcList]);
        setInputName('');
      })
      .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
  }

  return renderPage;
}

export default UserFeed;
