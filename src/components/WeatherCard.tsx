import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Tooltip, Chip } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FiberMannualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface WeatherCardProps {
  location: string;
  time: string;
  temperature: number;
  temperatureUnit?: 'F' | 'C';
  condition: string;
  icon: string;
  feelsLike: string;
  summary: string;
  airQuality: number;
  wind: string;
  humidity: number;
  visibility: string;
  pressure: string;
  dewPoint: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  time,
  temperature,
  temperatureUnit = 'F',
  condition,
  icon,
  feelsLike,
  summary,
  airQuality,
  wind,
  humidity,
  visibility,
  pressure,
  dewPoint,
}) => (
  // <Card className="glass-effect"
  //   sx={{
  //     // background: "linear-gradient(135deg, #22304a 0%, #2d3956 100%)",
  //     background: "linear-gradient(135deg, #3a4b6a 0%, #4a5a78 100%)",
  //     color: "#fff",
  //     borderRadius: 4,
  //     p: 2,
  //   }}
  // >
  <Card
    sx={{
      background: 'linear-gradient(135deg, rgba(58, 75, 106, 0.8) 0%, rgba(74, 90, 120, 0.5) 100%)',
      color: '#fff',
      borderRadius: 4,
      p: 2,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)', // for Safari support
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    }}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap={'wrap'}>
        <Box>
          <Typography variant="subtitle2" color="inherit">
            Weather on {location}
          </Typography>
          <Typography variant="caption" color="inherit">
            {time}
          </Typography>
        </Box>
        <Tooltip title="Change location or report incorrect weather">
          <Chip
            icon={<InfoOutlinedIcon />}
            label="Seeing different weather?"
            size="small"
            sx={{
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontWeight: 500,
              cursor: 'pointer',
            }}
            clickable
          />
        </Tooltip>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {/* <WbCloudyIcon sx={{ fontSize: 56, mr: 2 }} /> */}
        <img src={icon} alt={condition} style={{ width: 64, height: 64, marginRight: 12 }} />
        <Typography variant="h2" fontWeight={700} sx={{ mr: 1 }}>
          {temperature}
        </Typography>
        <Typography variant="h3" fontWeight={400} sx={{ mr: 2 }}>
          °{temperatureUnit}
        </Typography>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {condition}
          </Typography>
          <Typography variant="body2" color="inherit">
            Feels like{' '}
            <b>
              {feelsLike}
              {temperatureUnit}
            </b>
          </Typography>
        </Box>
      </Box>
      <Stack direction="row" spacing={3} mt={2} justifyContent="flex-start">
        <Tooltip title="Air quality index (lower is better)">
          <Box display="flex" alignItems="center">
            <FiberMannualRecordIcon
              sx={{
                mr: 0.5,
                color:
                  airQuality <= 50
                    ? '#4caf50' // Good (Green)
                    : airQuality <= 100
                      ? '#ffeb3b' // Moderate (Yellow)
                      : airQuality <= 150
                        ? '#ff9800' // Unhealthy for Sensitive Groups (Orange)
                        : airQuality <= 200
                          ? '#f44336' // Unhealthy (Red)
                          : airQuality <= 300
                            ? '#8e24aa' // Very Unhealthy (Purple)
                            : '#795548', // Hazardous (Brown)
              }}
            />
            <Typography variant="body2">{airQuality}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Wind speed and direction">
          <Box display="flex" alignItems="center">
            <AirIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{wind}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Relative humidity">
          <Box display="flex" alignItems="center">
            <OpacityIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{humidity}%</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Visibility distance">
          <Box display="flex" alignItems="center">
            <VisibilityIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{visibility}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Atmospheric pressure">
          <Box display="flex" alignItems="center">
            <CompressIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{pressure}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Dew point temperature">
          <Box display="flex" alignItems="center">
            <DeviceThermostatIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">
              {dewPoint}
              {temperatureUnit}
            </Typography>
          </Box>
        </Tooltip>
      </Stack>
      <Typography
        variant="body1"
        color="inherit"
        mt={2}
        mb={2}
        mr={0.5}
        ml={0.5}
        sx={{ textAlign: 'justify', lineHeight: 1.4, fontSize: '0.90rem' }}
      >
        {summary}
      </Typography>
    </CardContent>
  </Card>
);

export default WeatherCard;
