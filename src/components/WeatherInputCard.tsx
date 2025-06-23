import { useState } from 'react';
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
import { futureWeather } from '../services/weatherApi';
import type { FutureResponse } from '../services/responseTypes';

const WeatherInputCard = () => {
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [futureWeatherData, setFutureWeatherData] = useState<FutureResponse | null>(null);

  const handleSearch = () => {
    console.log('Searching weather for:', { place, date });

    if (place && date) {
      futureWeather(place, date)
        .then((data) => {
          console.log('Weather data:', data);
          setFutureWeatherData(data);
          console.log('Future weather data:', futureWeatherData);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    } else {
      console.warn('Please enter both place and date');
    }
  };

  return (
    <Box>
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
            <Grid
            // item xs={12} md={6}
            >
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
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                      repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(255,255,255,0.1) 16px),
                      repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.1) 16px)
                    `,
                    opacity: 0.2,
                  }}
                />
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{ transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 1 }}
                >
                  <MapIcon sx={{ fontSize: 56, opacity: 0.9 }} />
                  <Typography variant="h6" mt={1}>
                    Interactive Map
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Click to select location
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="center" gap={2}>
                    <Box sx={pulseDot('green')} />
                    <Box sx={pulseDot('blue')} />
                    <Box sx={pulseDot('yellow')} />
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right: Form */}
            <Grid
              // item
              // xs={12}
              // // md={6}
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

              <TextField
                fullWidth
                type="date"
                variant="filled"
                label="Select Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: {
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      borderRadius: 2,
                      color: 'white',
                    },
                  },
                  inputLabel: {
                    shrink: true,
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

const pulseDot = (color: string) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  bgcolor: color,
  animation: 'pulse 1.5s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)', opacity: 1 },
    '50%': { transform: 'scale(1.5)', opacity: 0.5 },
    '100%': { transform: 'scale(1)', opacity: 1 },
  },
});

export default WeatherInputCard;
