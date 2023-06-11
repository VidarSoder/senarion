import React, { useContext } from 'react';
import { AppBar, Button, Link } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const TopNav = () => {
    const { currentUser, signOut } = useContext(AuthContext);

    return (
        <AppBar
            position='sticky'
            sx={{ top: 0, backgroundColor: 'white' }}
            elevation={1}
        >
            {currentUser
                ? <Button color='primary' onClick={signOut}>Sign Out</Button>
                : <Link component='a' color='primary' href='/signup' underline='none'>Login</Link>
            }
        </AppBar>
    );
};

export default TopNav;
