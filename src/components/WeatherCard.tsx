import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Tooltip, Chip } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberMannualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface WeatherCardProps {
  location: string;
  time: string;
  temperature: number;
  temperatureUnit?: 'F' | 'C';
  condition: string;
  icon: string;
  feelsLike: number;
  summary: string;
  airQuality: number;
  wind: string;
  humidity: number;
  visibility: string;
  pressure: string;
  dewPoint: number;
  onRefresh: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  time,
  temperature,
  temperatureUnit = 'C',
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
  onRefresh,
}) => (
  <Card
    sx={{
      background: 'linear-gradient(135deg, rgba(58, 75, 106, 0.8), rgba(74, 90, 120, 0.5))',
      color: '#fff',
      borderRadius: 2,
      p: { xs: 0.5, sm: 1 },
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      width: '100%',
    }}
  >
    <CardContent>
      {/* Header: Location & Refresh */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection='row'
        gap={1}
      >
        <Box>
          <Typography variant="subtitle2">Weather on {location}</Typography>
          <Typography variant="caption">{time}</Typography>
        </Box>
        <Tooltip title="Refresh">
          <Chip
            icon={<RefreshIcon />}
            label="Refresh"
            size="small"
            sx={{
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontWeight: 500,
            }}
            clickable
            onClick={onRefresh}
          />
        </Tooltip>
      </Box>

      {/* Main Weather Info */}
      <Box
        display="flex"
        alignItems="center"
        flexDirection='row'
        mt={3}
        gap={2}
      >
        <img
          src={icon}
          alt={condition}
          style={{
        width: '48px',
        height: '48px',
          }}
          srcSet={`
        ${icon} 1x,
        ${icon} 2x
          `}
          sizes="(max-width:600px) 40px, 56px"
          // Responsive size via sx for MUI v5+
          // If you want to use sx prop instead of style:
          // sx={{ width: { xs: 40, sm: 56 }, height: { xs: 40, sm: 56 } }}
        />
        <Box
          display="flex"
          alignItems="flex-end"
          sx={{
            mr: { xs: 0, sm: 1 },
            mb: { xs: 0.5, sm: 0 },
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              mr: 0,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1,
            }}
          >
            {temperature}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              lineHeight: 1.2,
            }}
          >
            °{temperatureUnit}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600}>
        {condition}
          </Typography>
          <Typography variant="body2">
        Feels like{' '}
        <b>
          {feelsLike}°{temperatureUnit}
        </b>
          </Typography>
        </Box>
      </Box>

      {/* Extra Metrics */}
      <Stack
        direction="row"
        spacing={2}
        mt={3}
        flexWrap="wrap"
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
      >
        <Tooltip title="Air quality index (lower is better)">
          <Box display="flex" alignItems="center">
            <FiberMannualRecordIcon
              sx={{
                mr: 0.5,
                color:
                  airQuality <= 50
                    ? '#4caf50'
                    : airQuality <= 100
                      ? '#ffeb3b'
                      : airQuality <= 150
                        ? '#ff9800'
                        : airQuality <= 200
                          ? '#f44336'
                          : airQuality <= 300
                            ? '#8e24aa'
                            : '#795548',
                fontSize: '1.2rem',
              }}
            />
            <Typography variant="body2">{airQuality}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Wind speed and direction">
          <Box display="flex" alignItems="center">
            <AirIcon sx={{ mr: 0.5 , fontSize:'1.2rem'}} />
            <Typography variant="body2">{wind}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Humidity">
          <Box display="flex" alignItems="center">
            <OpacityIcon sx={{ mr: 0.5, fontSize:'1.2rem' }} />
            <Typography variant="body2">{humidity}%</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Visibility">
          <Box display="flex" alignItems="center">
            <VisibilityIcon sx={{ mr: 0.5, fontSize:'1.2rem' }} />
            <Typography variant="body2">{visibility}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Pressure">
          <Box display="flex" alignItems="center">
            <CompressIcon sx={{ mr: 0.5, fontSize:'1.2rem' }} />
            <Typography variant="body2">{pressure}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Dew point">
          <Box display="flex" alignItems="center">
            <DeviceThermostatIcon sx={{ mr: 0.5, fontSize:'1.2rem' }} />
            <Typography variant="body2">
              {dewPoint}°{temperatureUnit}
            </Typography>
          </Box>
        </Tooltip>
      </Stack>

      {/* Weather Summary */}
      <Typography
        variant="body2"
        mt={3}
        sx={{
          textAlign: 'justify',
          fontSize: { xs: '0.85rem', sm: '0.9rem' },
          lineHeight: 1.5,
        }}
      >
        {summary}
      </Typography>
    </CardContent>
  </Card>
);

export default WeatherCard;
