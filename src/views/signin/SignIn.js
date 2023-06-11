import React from 'react';
import Box from '@mui/material/Box';

import Container from '../../components/Container';
import { Form } from './components';

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
        <Container sx={{ maxWidth: 800 }}>
          <Form />
        </Container>
      </Box>
    </Container>
  );
};

export default Signin;