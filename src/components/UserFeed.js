import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Pagination, Stack, Typography, Button, TextField } from '@mui/material';

import Calc from './Calc';

function UserFeed(props) {
  const navigate = useNavigate();
  const [calcList, setCalcList] = useState([]);
  const [inputName, setInputName] = useState('');
  const [hidden, setHidden] = useState(false);
  const [page, setPage] = useState(1);

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
        setHidden(true);
        const calcListAdd = [];
        data.reverse().forEach((geo) => {
          calcListAdd.push(<Calc key={geo._id} data={geo} delete={getData} />);
        });
        setCalcList([...calcList, ...calcListAdd]);
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
        setPage(1);
      })
      .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <TextField
            sx={{ ml: '1rem' }}
            size="small"
            inputProps={{
              style: {
                height: '20px',
              },
            }}
            placeholder="enter project name"
            value={inputName}
            onChange={(event) => setInputName(event.target.value)}
          />
          <Button sx={{ ml: '1rem', mr: '2rem' }} variant="contained" onClick={postData}>
            CREATE NEW STUDY
          </Button>
        </Box>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Pagination
            shape="rounded"
            count={calcList.length}
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </Stack>
      </Box>
      {calcList[page - 1]}
    </Box>
  );
}

export default UserFeed;
