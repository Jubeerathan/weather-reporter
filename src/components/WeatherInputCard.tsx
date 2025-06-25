import { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Divider,
  InputAdornment,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { fetchWeatherData } from '../services/weatherApi';
import type { WeatherResponse } from '../utils/types';
import MapWithMarker from './MapWithMarker';
import { LocationContext } from '../context/LocationContext';
import { SnackbarContext } from '../context/SnackbarContext';

const WeatherInputCard = () => {
  const { location, setLocation } = useContext(LocationContext);
  const { showMessage } = useContext(SnackbarContext);
  const [place, setPlace] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  const handleSearch = () => {
    console.log('Searching weather for:', { place });

    if (place) {
      fetchWeatherData(place)
        .then((data) => {
          setWeatherData(data);
          setLocation({
            name: data.location.name,
            lat: data.location.lat,
            lon: data.location.lon,
            region: data.location.region,
            country: data.location.country,
            tz_id: data.location.tz_id,
            localtime_epoch: data.location.localtime_epoch,
            localtime: data.location.localtime,
          });
          console.log('New location data:', location);
          console.log('Future weather data:', weatherData);
        })
        .catch((error) => {
          showMessage(`Error: ${error.message}`, 'error');
          console.error('Error fetching weather data:', error.message);
        });
    } else {
      showMessage('Please enter a place to search for weather', 'warning');
      console.warn('Please enter both place');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Card
        sx={{
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(58,75,106,0.8) 0%, rgba(74,90,120,0.5) 100%)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          color: 'white',
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            {/* Left: Mock Map */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 320,
                  borderRadius: 3,
                  overflow: 'hidden',
                  background:
                    'linear-gradient(135deg, rgba(58,75,106,0.9) 0%, rgba(74,90,120,0.7) 100%)',
                }}
              >
                {<MapWithMarker location={location} />}
              </Box>
            </Grid>
            {/* Right: Form */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}
            >
              <TextField
                fullWidth
                variant="filled"
                label="Enter Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: {
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      borderRadius: 2,
                      color: 'white',
                    },
                  },
                  inputLabel: {
                    style: { color: 'white' },
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{
                  py: 1.5,
                  fontWeight: 'bold',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(58,75,106,0.9), rgba(74,90,120,0.8))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(58,75,106,1), rgba(74,90,120,0.9))',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                Search Weather
              </Button>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

              <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                sx={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'green' }} />
                  <Typography variant="body2">Live Data</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <CalendarTodayIcon fontSize="small" />
                  <Typography variant="body2">7‑Day Forecast</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <MapIcon fontSize="small" />
                  <Typography variant="body2">Global Coverage</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherInputCard;
