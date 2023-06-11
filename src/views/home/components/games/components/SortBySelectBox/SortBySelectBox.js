import React, { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BoardGamesContext } from '../../../../../../context/BoardGameContext'

const SortBySelectBox = () => {
  const theme = useTheme();
  const [sortBy, setSortBy] = useState(0);
  const { sortByName, sortByReleaseDate, sortByOwners, sortByLatestPlayed } = useContext(BoardGamesContext);

  const handleSelectChange = (event) => {
    setSortBy(event.target.value);
    switch (event.target.value) {
      case 1:
        sortByName();
        break;
      case 2:
        sortByOwners();
        break;
      case 3:
        sortByLatestPlayed();
        break;
      case 4:
        sortByReleaseDate();
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={sortBy}
          onChange={handleSelectChange}
          sx={{
            '.MuiSelect-select.MuiSelect-outlined': {
              paddingY: '9px !important',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.divider,
            },
          }}
        >
          <MenuItem value={0}>Sort</MenuItem>
          <MenuItem value={1}>Name</MenuItem>
          <MenuItem value={2}>Owners</MenuItem>
          <MenuItem value={3}>Last Played</MenuItem>
          <MenuItem value={4}>Release Date</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBySelectBox;
