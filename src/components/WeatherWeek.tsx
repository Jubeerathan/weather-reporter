import React, { useState, useMemo } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import WeatherDay from "./WeatherDay";
import weatherData from "../../../res.json";

interface ForecastDay {
  date: string;
  hour: any[]; // Replace with proper type based on your data structure
}

const WeatherWeek: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Memoize forecast days to prevent unnecessary recalculations
  const forecastDays = useMemo(
    () => weatherData.forecast.forecastday.slice(0, 7) as ForecastDay[],
    []
  );

  // Memoize formatted dates for better performance
  const formattedDates = useMemo(
    () =>
      forecastDays.map((day) => {
        const date = new Date(day.date);
        return {
          short: date.toLocaleDateString("en-US", { 
            weekday: "short", 
            month: "short", 
            day: "numeric" 
          }),
          full: date.toLocaleDateString()
        };
      }),
    [forecastDays]
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const selectedDay = forecastDays[selectedTab];

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* Horizontal scrollable tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Weather forecast tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: 1,
            },
            "& .MuiTab-root": {
              minWidth: 120,
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            },
            "& .MuiTabs-scrollButtons": {
              "&.Mui-disabled": {
                opacity: 0.3,
              },
            },
          }}
        >
          {formattedDates.map((dateInfo, index) => (
            <Tab
              key={forecastDays[index].date}
              label={dateInfo.short}
              title={dateInfo.full} // Tooltip on hover
              id={`weather-tab-${index}`}
              aria-controls={`weather-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Weather day content */}
      <Box
        sx={{
          mt: 2,
          p: 1,
        }}
        role="tabpanel"
        id={`weather-tabpanel-${selectedTab}`}
        aria-labelledby={`weather-tab-${selectedTab}`}
      >
        {selectedDay && (
          <WeatherDay
            key={selectedDay.date}
            date={selectedDay.date}
            hours={selectedDay.hour}
          />
        )}
      </Box>
    </Box>
  );
};

export default WeatherWeek;