import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          py: 4,
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'primary.main'
          }}
        >
          Découvrez Montpellier
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          gutterBottom
          sx={{ textAlign: 'center' }}
        >
          Trouvez les meilleures activités et aventures près de chez vous
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <TextField
            fullWidth
            label="Que souhaitez-vous faire ?"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
            }}
          >
            Rechercher
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
