import React, { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherWeek from './components/WeatherWeek';
import { fetchWeatherData } from './services/weatherApi';
import { Typography, CssBaseline, AppBar, Toolbar, Box, Container } from '@mui/material';
import { WbSunnyRounded } from '@mui/icons-material';
import WeatherInputCard from './components/WeatherInputCard';

interface WeatherData {
  current: Record<string, any>;
  location: Record<string, any>;
}

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, []);

  return (
    <div className="weather-container">
      <div className="background-effects">
        <div className="sun" />
        <div className="clouds">
          <div className="cloud cloud1" />
          <div className="cloud cloud2" />
          <div className="cloud cloud3" />
        </div>
        <div className="particles" id="particleContainer" />
      </div>

      <div className="app-content">
        <CssBaseline />
        <AppBar
          position="static"
          sx={{
            background:
              'linear-gradient(135deg, rgba(15, 76, 117, 0.9) 0%, rgba(50, 130, 184, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(176, 224, 255, 0.2)',
          }}
          elevation={0}
        >
          <Toolbar>
            <WbSunnyRounded fontSize="medium" sx={{ mr: 2, color: '#ffeb3b' }} />
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }} noWrap>
              Weather Reporter
            </Typography>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="lg"
          sx={{
            py: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 120px)',
          }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : weather ? (
            <>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '2rem',
                  justifyContent: 'space-between',
                }}
              >
                <WeatherCard
                  time="11:38 AM"
                  temperature={82}
                  temperatureUnit="F"
                  condition="Mostly cloudy"
                  feelsLike={91}
                  summary="The skies will be mostly cloudy. The high will be 87° on this very humid day."
                  airQuality={40}
                  wind="4 mph"
                  humidity={76}
                  visibility="6.2 mi"
                  pressure="29.83"
                  dewPoint="74°"
                />
                <WeatherInputCard />
              </div>
              <WeatherWeek />
            </>
          ) : null}
        </Container>

        <Box
          component="footer"
          sx={{
            width: '100%',
            py: 2,
            background:
              'linear-gradient(135deg, rgba(15, 76, 117, 0.8) 0%, rgba(50, 130, 184, 0.8) 100%)',
            textAlign: 'center',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(176, 224, 255, 0.2)',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            © {new Date().getFullYear()} Weather Reporter. All rights reserved.
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default App;
