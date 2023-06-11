import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { Box, Grid, TextField, Button, Typography, Link } from '@mui/material';

const FormField = ({ label, name, value, type = 'text', onChange }) => (
  <Grid item xs={12} sm={name === 'firstName' || name === 'lastName' ? 6 : 12}>
    <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
      Enter your {label.toLowerCase()}
    </Typography>
    <TextField
      label={`${label} *`}
      variant="outlined"
      name={name}
      type={type}
      fullWidth
      value={value}
      onChange={onChange}
    />
  </Grid>
);

const Form = () => {
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { firstName, lastName, bio, email, password } = state;
      await signUp(firstName, lastName, bio, email, password);
      navigate('/signin');
    } catch {
      alert('Failed to create an account');
    }
  };

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Create an account</Typography>
        <Typography sx={{ fontWeight: 700 }}>Tips från coachen - Fejk email och simpelt lösenord passar bra!</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {Object.keys(state).map((key) => (
            <FormField
              key={key}
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={state[key]}
              type={key === 'password' ? 'password' : 'text'}
              onChange={handleChange}
            />
          ))}
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Already have an account?{' '}
                  <Link component={'a'} color={'primary'} href={'/signin'} underline={'none'}>Login.</Link>
                </Typography>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>Sign up</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;