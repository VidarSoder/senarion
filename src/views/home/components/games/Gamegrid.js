import React, { useState, useContext } from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { BoardGamesContext } from '../../../../context/BoardGameContext'
import { AuthContext } from '../../../../context/AuthContext';
import { SortBySelectBox, CategorySelect } from './components'

const Gamegrid = () => {
  const { boardGames, setBoardGames } = useContext(BoardGamesContext);
  const [clickedBoardGame, setClickedBoardGame] = useState([]);
  const [reviewData, setReviewData] = useState(null); // State to hold the fetched review data
  const { token, uid } = useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  console.log(boardGames)

  const handleButtonClick = async (itemId) => {
    console.log('buttonClicked')
  };

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={4}
      >
        <Box display={'flex'}>
          <SortBySelectBox />
          <CategorySelect />
        </Box>
      </Box>
      <Grid container spacing={4}>
        {boardGames.map((item, i) => (
          item.selected === true ?
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                href={''}
                display={'block'}
                width={1}
                height={1}
                sx={{
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                <Box
                  component={Card}
                  width={1}
                  height={1}
                  boxShadow={4}
                  display={'flex'}
                  flexDirection={'column'}
                  sx={{ backgroundImage: 'none' }}
                >
                  <CardMedia
                    image={`https://picsum.photos/200/300?random=${item.id}`}
                    title={item.name}
                    sx={{
                      height: { xs: 200, md: 200 },
                      position: 'relative',
                    }}
                  >
                    <Box
                      component={'svg'}
                      viewBox="0 0 2880 480"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        color: theme.palette.background.paper,
                        transform: 'scale(2)',
                        height: 'auto',
                        width: 1,
                        transformOrigin: 'top center',
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
                        fill="currentColor"
                      />
                    </Box>
                  </CardMedia>
                  <Box component={CardContent} position={'relative'}>
                    <Typography variant={'h6'} gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.tagline}
                    </Typography>
                  </Box>
                  <Box flexGrow={1} />
                  <Box padding={2} display={'flex'} flexDirection={'column'}>
                    <Box marginBottom={2}>
                      <Divider />
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Button
                        color={'primary'}
                        size={'large'}
                        fullWidth
                        sx={{
                          bgcolor: alpha(theme.palette.primary.light, 0.1),
                          fontWeight: 700,
                        }}
                        onClick={() => {
                          setOpen(true);
                          setClickedBoardGame(item);
                          handleButtonClick(item.id); // Fetch reviews when button is clicked
                        }}
                      >
                        Click to see the details
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid> : null
        ))}
      </Grid>
    </Box>
  );
};

export default Gamegrid;
