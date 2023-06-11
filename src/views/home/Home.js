import React from 'react';
import Box from '@mui/material/Box';
import Container from '../../components/Container'
import {
    Hero,
    Gamegrid,
    Profile,
} from './components';
import Typography from '@mui/material/Typography';
import TopNav from '../../components/TopNav';

const Home = () => {
    return (
        <div>
            <TopNav />
            <Box >
                <Hero />
                <Box marginBottom={4}>
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'medium',
                        }}
                        gutterBottom
                        align={'center'}
                    >
                        Välkommen
                    </Typography>
                    <Typography
                        variant="h4"
                        align={'center'}
                        data-aos={'fade-up'}
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Här är samtliga våra brädspel!
                    </Typography>
                    <Typography
                        variant="h6"
                        align={'center'}
                        color={'text.secondary'}
                        data-aos={'fade-up'}
                    >
                        Vi har samlat samtliga brädspel, där du med lätthet kan sortera och filtrera på kategorier!
                        <br />
                        allt för att det ska bli lättare för <b>dig!</b>
                    </Typography>

                </Box>
                <Container paddingTop={'0 !important'}>
                    <Gamegrid />
                </Container>
                <Container paddingTop={'0 !important'}>
                    <Profile />
                </Container>
            </Box>
        </div>
    );
};

export default Home;
