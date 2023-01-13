import React, { useState, useEffect } from 'react';
import { Pagination, Stack, Typography } from '@mui/material';

import CalcLocked from './CalcLocked';

function PublicFeed(props) {
  const [calcList, setCalcList] = useState([]);
  const [page, setPage] = useState(1);
  const [activePage, setActivePage] = useState();

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
        setCalcList([...calcListAdd, ...calcList]);
        setActivePage(calcListAdd[0]);
      })
      .catch((error) => console.log('ERROR: could not get-fetch: ' + error));
  }

  return (
    <>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <Pagination
          shape="rounded"
          count={calcList.length}
          page={page}
          onChange={(event, value) => {
            setPage(value);
            setActivePage(calcList[value - 1]);
          }}
        />
      </Stack>
      {activePage}
    </>
  );
}

export default PublicFeed;
