import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';

import { GameInformation } from './components';

const DetailsPopup = ({ onClose, open, data, reviewData }) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth={'lg'}>
      <Box paddingY={{ xs: 1, sm: 2 }} paddingX={{ xs: 2, sm: 4 }}>
        <Box
          paddingY={{ xs: 1, sm: 2 }}
          display={'flex'}
          justifyContent={'flex-end'}
        >
        </Box>
        <Box paddingY={2}>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={6}>
              <img src={`https://picsum.photos/300/400?random=${data.id}`} />
            </Grid>
            <Grid item xs={12} md={6}>
              <GameInformation data={data} reviewData={reviewData} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DetailsPopup;
