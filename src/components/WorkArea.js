import React from 'react';
import { Box } from '@mui/material';

function WorkArea(props) {
  return (
    <Box
      sx={{
        pl: '11rem',
        pt: '5rem',
      }}
    >
      {props.children}
    </Box>
  );
}

export default WorkArea;
