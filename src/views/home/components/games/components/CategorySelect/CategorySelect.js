import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { BoardGamesContext } from '../../../../../../context/BoardGameContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CategorySelect = () => {
    const theme = useTheme();
    const { getAllCategories, selectByCategory } = useContext(BoardGamesContext);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        setCategories(getAllCategories);
    }, [getAllCategories]);

    useEffect(() => {
        selectByCategory(selectedCategories);
    }, [selectedCategories]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <FormControl sx={{ width: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
                labelId="Category"
                id="Category"
                multiple
                value={selectedCategories}
                onChange={handleChange}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
            >
                {categories.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CategorySelect;