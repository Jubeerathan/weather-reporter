import axios from 'axios';
import type { ForecastResponse, FutureResponse, WeatherResponse } from './responseTypes';

// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_BACKEND_CHOREO_URL;
// const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

// interface WeatherResponse {
//   location: {
//     name: string;
//     region: string;
//     country: string;
//     lat: number;
//     lon: number;
//     tz_id: string;
//     localtime_epoch: number;
//     localtime: string;
//   };
//   current: {
//     temp_c: number;
//     temp_f: number;
//     condition: {
//       text: string;
//       icon: string;
//       code: number;
//     };
//     humidity: number;
//     wind_kph: number;
//     // Add other weather properties as needed
//   };
// }

export const fetchWeatherData = async (location = 'Colombo'): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(`${BASE_URL}currentWeather?city=${location}`);
    console.log('Weather data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${(error as Error).message}`);
  }
};

export const fetchCurrentWeatherSummary = async (location = 'Colombo'): Promise<string> => {
  try {
    const response = await axios.get<string>(`${BASE_URL}currentWeatherSummary?city=${location}`);
    console.log('Weather summary fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather summary: ${(error as Error).message}`);
  }
};

export const fetchWeatherForecast = async (
  location = 'Colombo',
  days = 7,
): Promise<ForecastResponse> => {
  try {
    const response = await axios.get<ForecastResponse>(
      `${BASE_URL}forecast?city=${location}&days=${days}`,
    );
    console.log('Weather forecast fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather forecast: ${(error as Error).message}`);
  }
};

export const futureWeather = async (location: string, date: string): Promise<FutureResponse> => {
  try {
    const response = await axios.get<FutureResponse>(
      `${BASE_URL}futureWeather?city=${location}&date=${date}`,
    );
    console.log('Future weather data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching future weather data: ${(error as Error).message}`);
  }
};
