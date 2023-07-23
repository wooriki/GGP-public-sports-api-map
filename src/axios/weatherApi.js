import axios from 'axios';

export const getWeatherData = async (latitude, longitude) => {
  const weather_KEY = process.env.REACT_APP_WEATHER_KEY;
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      lat: latitude,
      lon: longitude,
      appid: weather_KEY,
      units: 'metric',
      lang: 'kr'
    }
  });
  return response.data;
};
