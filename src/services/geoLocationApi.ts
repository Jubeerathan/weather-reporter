import axios from 'axios';
import type { GeoCode } from '../utils/types';

const BASE_URL = import.meta.env.VITE_BACKEND_CHOREO_URL;

export const fetchGeoCode = async (latitude: string, longitude: string): Promise<GeoCode> => {
  try {
    const response = await axios.get<GeoCode>(
      `${BASE_URL}reverseGeocode?lat=${latitude}&lon=${longitude}`,
    );
    console.log('Geolocation fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error(`Error fetching geolocation data: ${(error as Error).message}`);
  }
};
