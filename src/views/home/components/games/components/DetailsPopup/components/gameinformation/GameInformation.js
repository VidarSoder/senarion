import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { saveReview, deleteReview, fetchReviews } from '../../../../../../../../firebase/api/Reviews'
import { AuthContext } from '../../../../../../../../context/AuthContext';
import { savePlaytime, deletePlaytime, fetchPlaytimes } from '../../../../../../../../firebase/api/Playtime'
import { fetchUserRatings } from '../../../../../../../../firebase/api/Rating';
import Card from '@mui/material/Card';

const GameInformation = ({ data, reviewData }) => {
  const theme = useTheme();

  const [rating, setRating] = useState('');
  const [owned, setOwned] = useState(false);
  const [localReviewData, setLocalReviewData] = useState(reviewData);
  const [userRatings, setUserRatings] = useState(null);
  const { uid } = useContext(AuthContext);
  const [playtime, setPlaytime] = useState(0);
  const [playtimes, setPlaytimes] = useState([]);
  const [fetchPlaytimesCounter, setFetchPlaytimesCounter] = useState(0);

  useEffect(() => {
    const fetchUserRatingsData = async () => {
      if (uid) {
        const userRatingsData = await fetchUserRatings(+data.id);
        setUserRatings([
          {
            title: userRatingsData.averageRating,
            subtitle: 'Snittbetyg',
          },
          {
            title: userRatingsData.owners,
            subtitle: 'Ägare på vår site',
          },
          {
            title: userRatingsData.averagePlaytime,
            subtitle: 'Genomsnittlig tid',
          },
        ]);
      }
    };

    fetchUserRatingsData();
  }, [data.id, uid, reviewData, fetchPlaytimesCounter, userRatings]);


  useEffect(() => {
    setRating(localReviewData && localReviewData.length > 0 ? localReviewData[0].rating : 0);
    setOwned(localReviewData && localReviewData.length > 0 ? localReviewData[0].owned : false);
  }, [localReviewData]);

  useEffect(() => {
    setRating(reviewData && reviewData.length > 0 ? reviewData[0].rating : 0);
    setOwned(reviewData && reviewData.length > 0 ? reviewData[0].owned : false);
  }, [reviewData]);

  useEffect(() => {
    const fetchPlaytimesData = async () => {
      if (uid) {
        const playtimesData = await fetchPlaytimes(+data.id, uid);
        setPlaytimes(playtimesData);
      }
    };

    fetchPlaytimesData();
  }, [uid, data.id]);

  useEffect(() => {
    const fetchPlaytimesData = async () => {
      if (uid) {
        const playtimesData = await fetchPlaytimes(+data.id, uid);
        setPlaytimes(playtimesData);
      }
    };

    fetchPlaytimesData();
  }, [fetchPlaytimesCounter, data.id, uid]);

  const handleSaveReview = async () => {
    if (uid && rating !== 0) {
      await saveReview(+data.id, rating, owned, uid);
      const newReviewData = await fetchReviews(+data.id, uid);
      setLocalReviewData(newReviewData);
    }
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      if (uid) {
        const fetchedReviewData = await fetchReviews(+data.id, uid);
        setLocalReviewData(fetchedReviewData);
        if (fetchedReviewData && fetchedReviewData.length > 0) {
          setRating(fetchedReviewData[0].rating);
          setOwned(fetchedReviewData[0].owned);
        }
      }
    };
    fetchReviewData();
  }, [data.id, uid]);

  const handleDeleteReview = async () => {
    if (uid) {
      await deleteReview(data.id, uid);
      setRating(0);
      setOwned(false);
      // Fetch new review data
      const newReviewData = await fetchReviews(data.id, uid);
      setLocalReviewData(newReviewData);
    }
  };

  const handleSavePlaytime = async () => {
    if (uid && playtime < 1000) {
      await savePlaytime(+data.id, playtime, uid);
      const newPlaytimes = await fetchPlaytimes(+data.id, uid);
      setPlaytimes(newPlaytimes);
    } else {
    }
  };

  const handleDeletePlaytime = async (playtimeId) => {
    if (uid) {
      await deletePlaytime(playtimeId);
      setFetchPlaytimesCounter(fetchPlaytimesCounter + 1); // Trigger a re-fetch
    }
  };

  return (
    <Box>
      <Typography variant={'h5'} fontWeight={700} gutterBottom>
        {data.name}
      </Typography>
      <Typography variant={'subtitle2'} color={'text.secondary'}>
        {data.tagline}
      </Typography>
      <Box
        marginTop={2}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} alignItems={'center'}>
          {data.players.min && data.players.max ? (
            <Typography
              variant={'caption'}
              color={'text.secondary'}
              marginLeft={0.5}
            >
              Players: <b>{data.players.min}-{data.players.max}</b>
            </Typography>
          ) : null}
        </Box>
        <Typography
          variant={'caption'}
          color={'text.secondary'}
          marginLeft={0.5}
        >
          Released: <b>{data.released}</b>
        </Typography>
        <Typography
          variant={'caption'}
          color={'text.secondary'}
          marginLeft={0.5}
        >
          Recommended Age: <b>{data.age}</b>
        </Typography>
      </Box>
      <Box
        marginTop={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {data.creators.length < 2 ? (
          <Typography
            variant={'caption'}
            color={'text.secondary'}
            marginLeft={0.5}
          >
            Creator: <b>{data.creators[0]}</b>
          </Typography>
        ) : (
          <Box>
            <Typography
              variant={'caption'}
              color={'text.secondary'}
              marginLeft={0.5}
            >
              Creators: <b>{data.creators.join(", ")}</b>
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        marginTop={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {data.categories.length < 2 ? (
          <Typography
            variant={'caption'}
            color={'text.secondary'}
            marginLeft={0.5}
          >
            Category: <b>{data.categories[0]}</b>
          </Typography>
        ) : (
          <Box>
            <Typography
              variant={'caption'}
              color={'text.secondary'}
              marginLeft={0.5}
            >
              Categories: <b>{data.categories.join(", ")}</b>
            </Typography>
          </Box>
        )}
      </Box>
      <Box marginY={4}>
        <Grid container spacing={2}>
          {userRatings ? (
            userRatings.map((item, i) => (
              <Grid key={i} item xs={12} md={4}>
                <Typography
                  variant="h3"
                  align={'center'}
                  fontWeight={700}
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  align={'center'}
                  component="p"
                >
                  {item.subtitle}
                </Typography>
              </Grid>
            ))
          ) : null}
        </Grid>
      </Box>
      <Divider />
      <Box marginTop={2}>
        <Typography>
          Your rating:{' '}
          <Typography component={'span'} fontWeight={700}>
            {rating || ''}
          </Typography>
        </Typography>
        <Box direction={'row'} display={'flex'} spacing={1} marginTop={0.5}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Box
              key={item}
              onClick={() => setRating(item)}
              sx={{
                borderRadius: 1,
                padding: 1,
                border: `2px solid ${rating === item ? theme.palette.primary.main : theme.palette.divider}`,
                cursor: 'pointer',
              }}
            >
              <Typography>{item}</Typography>
            </Box>
          ))}
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={owned}
                onChange={(e) => setOwned(e.target.checked)}
                color="primary"
              />
            }
            label="Do you own this game?"
          />
        </Box>
        <Stack marginTop={2} spacing={1} direction={'row'}>
          {localReviewData && localReviewData.length > 0 ? (
            // If the user has already submitted a review, display the "Delete Review" button
            <Button
              variant={'contained'}
              color={'secondary'}
              size={'large'}
              fullWidth
              onClick={handleDeleteReview}
            >
              delete review
            </Button>
          ) : (
            // If the user hasn't submitted a review, display the "Send Review" button
            <Button
              variant={'contained'}
              color={'primary'}
              size={'large'}
              fullWidth
              onClick={handleSaveReview}
            >
              send review
            </Button>
          )}

        </Stack>
      </Box>
      <Divider />
      <TextField
        label="Playtime"
        type="number"
        sx={{ marginTop: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 1,
        }}
        onChange={(e) => setPlaytime(e.target.value)}
      />
      <Button
        variant={'contained'}
        color={'primary'}
        size={'large'}
        fullWidth
        onClick={handleSavePlaytime}
      >
        Send Playtime
      </Button>
      {playtimes.map((playtime, index) => (
        <Card key={index} sx={{ marginTop: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
            <Typography variant="body1">
              Playtime: {playtime.playtime}
            </Typography>
            <Button
              variant={'contained'}
              color={'secondary'}
              size={'small'}
              onClick={() => handleDeletePlaytime(playtime.id)}
            >
              Delete Playtime
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default GameInformation;