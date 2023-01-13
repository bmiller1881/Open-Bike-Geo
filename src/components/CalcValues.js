import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';

function CalcValues(props) {
  return (
    <Box>
      <TextField
        sx={{ width: '250px' }}
        label={props.title}
        variant="filled"
        type="number"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        InputProps={{
          readOnly: props.disabled,
          endAdornment: (
            <InputAdornment position="end" sx={{ opacity: '.5' }}>
              {props.unit}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default CalcValues;
