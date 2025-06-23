import React, { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherWeek from './components/WeatherWeek';
import { fetchWeatherData, fetchCurrentWeatherSummary } from './services/weatherApi';
import { Typography, CssBaseline, AppBar, Toolbar, Box, Container } from '@mui/material';
import WbSunnyRounded from '@mui/icons-material/WbSunnyRounded';
import WeatherInputCard from './components/WeatherInputCard';
import type { WeatherResponse } from './services/responseTypes';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [currWeatherSummary, setCurrWeatherSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const currentWeatherData = await fetchWeatherData();
        setWeather(currentWeatherData);

        const currentWeatherSummary = await fetchCurrentWeatherSummary();
        setCurrWeatherSummary(currentWeatherSummary);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, []);

  function calculateAQI_PM25(pm25: number): number {
    const breakpoints = [
      { AQI_low: 0, AQI_high: 50, PM_low: 0.0, PM_high: 12.0 },
      { AQI_low: 51, AQI_high: 100, PM_low: 12.1, PM_high: 35.4 },
      { AQI_low: 101, AQI_high: 150, PM_low: 35.5, PM_high: 55.4 },
      { AQI_low: 151, AQI_high: 200, PM_low: 55.5, PM_high: 150.4 },
      { AQI_low: 201, AQI_high: 300, PM_low: 150.5, PM_high: 250.4 },
      { AQI_low: 301, AQI_high: 400, PM_low: 250.5, PM_high: 350.4 },
      { AQI_low: 401, AQI_high: 500, PM_low: 350.5, PM_high: 500.4 },
    ];

    for (const bp of breakpoints) {
      if (pm25 >= bp.PM_low && pm25 <= bp.PM_high) {
        const aqi =
          ((bp.AQI_high - bp.AQI_low) / (bp.PM_high - bp.PM_low)) * (pm25 - bp.PM_low) + bp.AQI_low;
        return Math.round(aqi);
      }
    }

    return -1;
  }

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
                  location={`${weather.location.name}, ${weather.location.country}.`}
                  time={weather.location.localtime}
                  temperature={weather.current.temp_c}
                  temperatureUnit={'C'}
                  condition={weather.current.condition.text}
                  icon={weather.current.condition.icon}
                  feelsLike={`${weather.current.feelslike_c} °`}
                  summary={currWeatherSummary || ''}
                  airQuality={calculateAQI_PM25(weather.current.air_quality.pm2_5)}
                  wind={`${weather.current.wind_kph} kph`}
                  humidity={weather.current.humidity}
                  visibility={`${weather.current.vis_km} km`}
                  pressure={`${weather.current.pressure_mb} mb`}
                  dewPoint={`${weather.current.dewpoint_c} °`}
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
