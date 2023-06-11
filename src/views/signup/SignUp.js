import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import Container from '../../components/Container'
import { Form } from './components';

const SignUp = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

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

export default SignUp;
