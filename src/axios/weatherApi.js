import axios from "axios";

const weather_KEY = "a2bb51d7a710556557d870a641343a46";

export const getWeatherData = async (latitude, longitude) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_KEY}&units=metric`
  );
  return response.data;
};
