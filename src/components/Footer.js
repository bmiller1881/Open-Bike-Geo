import React from 'react';
import { Box, TextField, Typography, Card } from '@mui/material';

function Footer(props) {
  return (
    <footer>
      <Box sx={{ p: '2rem' }}>
        <Typography>Open Bike Geo</Typography>
        <Typography>Designed By: Brandon Miller</Typography>
        <Typography>References: Model of a Bicycle from Handling Qualities Considerations: Davol, Owen, Fabijanic</Typography>
        <Typography>Version: V2.0 2023</Typography>
      </Box>
    </footer>
  );
}

export default Footer;
