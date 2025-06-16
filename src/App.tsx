import React, { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeatherData } from './services/weatherApi';
import { Typography, CssBaseline, AppBar, Toolbar, Box, Container } from '@mui/material';
import { WbSunnyRounded } from '@mui/icons-material';
import WeatherWeek from "./components/WeatherWeek";
import { red } from '@mui/material/colors';

interface WeatherData {
  current: Record<string, any>;
  location: Record<string, any>;
}

const App = () => {
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
        <div className="sun"></div>
        
        <div className="clouds">
            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
        </div>
        
        <div className="rain" id="rainContainer"></div>

        <div className="particles" id="particleContainer"></div>
        
   
        <div className="glass-effect"></div>
    
    <div>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <WbSunnyRounded fontSize='medium' sx={{ mr: 2 }} />
          <Typography variant="h5" color="inherit" noWrap>
            Weather Reporter
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : weather && (
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
        )}
        <div style={{overflowX: 'auto', width: '100%', marginTop: '20px'}}>
        <WeatherWeek />
        </div>
      </Container>

      <Box component="footer" sx={{
        width: '100%',
        py: 2,
        bgcolor: '#f5f5f5',
        textAlign: 'center',
        mt: 'auto'
      }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Weather Reporter. All rights reserved.
        </Typography>
      </Box>
    </div>
    </div>
  );
};

export default App;