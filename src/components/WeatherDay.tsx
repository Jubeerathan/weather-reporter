import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import WeatherHour from './WeatherHourCard';

interface WeatherDayProps {
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hours: any[];
}

const WeatherDay: React.FC<WeatherDayProps> = memo(({ date, hours }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          ml: 2,
          color: 'rgba(255, 255, 255, 0.95)',
          fontWeight: 600,
          textShadow: '2px 2px 4px rgba(15, 76, 117, 0.4)',
        }}
      >
        {formatDate(date)}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          overflowY: 'hidden',
          gap: 1,
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 3,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(176, 224, 255, 0.3)',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(176, 224, 255, 0.5)',
            },
          },
        }}
      >
        {hours.map((hour, index) => (
          <WeatherHour
            key={`${hour.time_epoch}-${index}`}
            hour={new Date(hour.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
            icon={hour.condition.icon}
            temp_f={hour.temp_f}
            condition={hour.condition.text}
            feelslike_f={hour.feelslike_f}
            wind_mph={hour.wind_mph}
            cloud={hour.cloud}
            visibility={`${hour.vis_miles} mi`}
            gust_mph={hour.gust_mph}
            humidity={hour.humidity}
            dewpoint_f={hour.dewpoint_f}
            pressure_in={hour.pressure_in}
            uv={hour.uv}
          />
        ))}
      </Box>
    </Box>
  );
});

WeatherDay.displayName = 'WeatherDay';

export default WeatherDay;
