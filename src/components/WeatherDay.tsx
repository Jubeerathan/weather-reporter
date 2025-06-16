import React from "react";
import { Box, Typography } from "@mui/material";
import WeatherHour from "./WeatherHourCard";

interface WeatherDayProps {
  date: string;
  hours: any[];
}

const WeatherDay: React.FC<WeatherDayProps> = ({ date, hours }) => (
  <Box sx={{ minWidth: 1400, mb: 2 }}>
    <Typography variant="h6" color="inherit" sx={{ mb: 1, ml: 2 }}>
      {date}
    </Typography>
    <Box display="flex" flexDirection="row" overflow="auto">
      {hours.map((h, idx) => (
        <WeatherHour
          key={h.time_epoch}
          hour={new Date(h.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          icon={h.condition.icon}
          temp_f={h.temp_f}
          condition={h.condition.text}
          feelslike_f={h.feelslike_f}
          wind_mph={h.wind_mph}
          cloud={h.cloud}
          visibility={`${h.vis_miles} mi`}
          gust_mph={h.gust_mph}
          humidity={h.humidity}
          dewpoint_f={h.dewpoint_f}
          pressure_in={h.pressure_in}
          uv={h.uv}
        />
      ))}
    </Box>
  </Box>
);

export default WeatherDay;