import React from 'react';
import Box from '@mui/material/Box';
import Container from '../../components/Container';
import { Form } from './components';
import Paper from '@mui/material/Paper';

const Signin = () => {
  return (
    <Container>
      <Box
        position={'relative'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={1}
      >
        <Paper elevation={4} sx={{ backgroundColor: '#f5f5f5', padding: 4, borderRadius: 2 }}>
          <Container sx={{ maxWidth: 800 }}>
            <Form />
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signin;
