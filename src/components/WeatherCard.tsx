import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FiberMannualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface WeatherCardProps {
  time: string;
  temperature: number;
  temperatureUnit?: "F" | "C";
  condition: string;
  feelsLike: number;
  summary: string;
  airQuality: number;
  wind: string;
  humidity: number;
  visibility: string;
  pressure: string;
  dewPoint: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  time,
  temperature,
  temperatureUnit = "F",
  condition,
  feelsLike,
  summary,
  airQuality,
  wind,
  humidity,
  visibility,
  pressure,
  dewPoint,
}) => (
  <Card className="glass-effect"
    sx={{
      background: "linear-gradient(135deg, #22304a 0%, #2d3956 100%)",
      color: "#fff",
      borderRadius: 4,
      p: 2,
    }}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle2" color="inherit">
            Current weather
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
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              fontWeight: 500,
              cursor: "pointer",
            }}
            clickable
          />
        </Tooltip>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <WbCloudyIcon sx={{ fontSize: 56, mr: 2 }} />
        <Typography variant="h2" fontWeight={700} sx={{ mr: 1 }}>
          {temperature}°
        </Typography>
        <Typography variant="h5" fontWeight={400} sx={{ mr: 2 }}>
          {temperatureUnit}
        </Typography>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {condition}
          </Typography>
          <Typography variant="body2" color="inherit">
            Feels like <b>{feelsLike}°</b>
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" color="inherit" mt={2} mb={2}>
        {summary}
      </Typography>
      <Stack direction="row" spacing={3} mt={2} justifyContent="flex-start">
        <Tooltip title="Air quality index (lower is better)">
          <Box display="flex" alignItems="center">
            <FiberMannualRecordIcon sx={{ mr: 0.5, color: "#4caf50" }} />
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
            <Typography variant="body2">{pressure} in</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Dew point temperature">
          <Box display="flex" alignItems="center">
            <DeviceThermostatIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{dewPoint}</Typography>
          </Box>
        </Tooltip>
      </Stack>
    </CardContent>
  </Card>
);

export default WeatherCard;