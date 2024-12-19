import React, { useState } from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Slider,
    Typography,
    Button
} from '@mui/material';

interface SearchFiltersProps {
    onSearch: (filters: {
        searchQuery: string;
        category: string;
        priceRange: number[];
        participantType: string;
    }) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [participantType, setParticipantType] = useState('');

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    const handleSearch = () => {
        onSearch({
            searchQuery,
            category,
            priceRange,
            participantType
        });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        label="Rechercher"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Catégorie</InputLabel>
                        <Select
                            value={category}
                            label="Catégorie"
                            onChange={(e) => {
                                setCategory(e.target.value);
                                handleSearch();
                            }}
                        >
                            <MenuItem value="">Toutes</MenuItem>
                            <MenuItem value="Culture">Culture</MenuItem>
                            <MenuItem value="Sport">Sport</MenuItem>
                            <MenuItem value="Nature">Nature</MenuItem>
                            <MenuItem value="Divertissement">Divertissement</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Type de participant</InputLabel>
                        <Select
                            value={participantType}
                            label="Type de participant"
                            onChange={(e) => {
                                setParticipantType(e.target.value);
                                handleSearch();
                            }}
                        >
                            <MenuItem value="">Tous</MenuItem>
                            <MenuItem value="solo">Solo</MenuItem>
                            <MenuItem value="group">Groupe</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Typography gutterBottom>
                        Prix (€)
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        onChangeCommitted={handleSearch}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        sx={{ mt: 2 }}
                    >
                        Rechercher
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchFilters;
