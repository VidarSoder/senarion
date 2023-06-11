/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { fetchAllUsers } from '../../../../firebase/api/Users';

const Profile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant={'h4'} sx={{ fontWeight: 700 }} align={'center'}>
          Våra första användare!
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align={'center'}
        >
          Vi är inte så många här än!
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {users.map((user, i) => (
          <Grid item xs={6} md={3} key={i}>
            <ListItem
              disableGutters
              data-aos={'fade-up'}
              data-aos-delay={i * 100}
              data-aos-offset={100}
              data-aos-duration={600}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
              }}
            >
              <ListItemAvatar>
                <Box
                  component={Avatar}
                  width={{ xs: 80, sm: 80, md: 120 }}
                  height={{ xs: 80, sm: 80, md: 120 }}
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  marginRight={2}
                />
              </ListItemAvatar>
              <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.bio} />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Profile;
