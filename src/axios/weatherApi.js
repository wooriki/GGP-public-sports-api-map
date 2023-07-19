import axios from 'axios';

const weather_KEY = process.env.REACT_APP_WEATHER_KEY;

export const getWeatherData = async (latitude, longitude) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_KEY}&units=metric`
  );
  return response.data;
};
