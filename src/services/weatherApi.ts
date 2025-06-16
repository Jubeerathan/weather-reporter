import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    // Add other weather properties as needed
  };
}

export const fetchWeatherData = async (location = 'Colombo'): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(`${BASE_URL}?key=${API_KEY}&q=${location}`);
    console.log('Weather data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${(error as Error).message}`);
  }
};
