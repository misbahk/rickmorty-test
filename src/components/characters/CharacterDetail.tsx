import { useCallback, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useCharacter } from '@/hooks/useCharacter';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CharacterDetail = () => {
  const { id } = useParams({ from: '/character/$id' });
  const [imageLoaded, setImageLoaded] = useState(false);
 
  const { data: character, isLoading, isError, error } = useCharacter(parseInt(id, 10));

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
      <CircularProgress />
    </Box>
  );
  
  if (isError) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Error: {(error as Error).message}
    </Alert>
  );
  
  if (!character) return (
    <Alert severity="warning" sx={{ mt: 2 }}>
      Character not found
    </Alert>
  );

  const infoFields = [
    { label: 'Status', value: character.status },
    { label: 'Species', value: character.species },
    { label: 'Gender', value: character.gender },
    { label: 'Origin', value: character.origin.name },
    { label: 'Location', value: character.location.name },
    { label: 'Episodes', value: character.episode.length },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to List
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
            <Card>
              {!imageLoaded && (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'grey.100'
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              <CardMedia
                component="img"
                image={character.image}
                alt={character.name}
                loading="lazy"
                onLoad={handleImageLoad}
                sx={{
                  height: 300,
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
            </Card>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                {character.name}
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                {infoFields.map(({ label, value }) => (
                  <Box key={label} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body1">
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CharacterDetail;
