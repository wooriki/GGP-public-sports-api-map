import React from 'react';
import { styled, keyframes } from 'styled-components';
import { useQuery } from 'react-query';
import { getWeatherData } from '../../axios/weatherApi';
import { useSelector } from 'react-redux';

const Weather = () => {
  const location = useSelector((state) => state.location);

  const dateBuilder = (d) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // sunday 먼저..!!
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Tur', 'Fri', 'Sat'];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();
    let hours = d.getHours().toString().padStart(2, '0');
    let minutes = d.getMinutes().toString().padStart(2, '0');
    return (
      <DateBuild>
        <Timmer>{`${hours}:${minutes}`}&nbsp;&nbsp;&nbsp;</Timmer>
        {`${day} ${date} ${month} ${year}`}
      </DateBuild>
    );
  };

  const {
    data: weatherData,
    isLoading,
    isError
  } = useQuery(
    // query key는 유니크해야함.
    // location이 변경될 때마다 새로운 weather의 쿼리를 트리거하고 싶을때 배열 형태로 사용
    ['weather', location],
    () => getWeatherData(location.latitude, location.longitude),
    {
      // enabled 옵션을 사용하여 쿼리를 조건부로 활성화하면
      // 불필요한 쿼리 실행을 방지하고 성능을 최적화할 수 있음
      enabled: location !== null
    }
  );

  if (!location) {
    return <Alert>Loading...</Alert>;
  }

  if (isLoading) {
    return <Alert>Loading weather data...</Alert>;
  }

  if (isError) {
    return <Alert>Error occurred while fetching weather data</Alert>;
  }

  if (!weatherData) {
    return <Alert>No weather data available</Alert>;
  }

  const { name, weather, main } = weatherData;
  // const currentDate = new Date();
  return (
    <>
      <WeatherWrapper>
        <WeatherInner>
          <WeatherImg src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather Icon" />
          <span>{`${main.temp}°C`}</span>
          <WeatherDate>{dateBuilder(new Date())}</WeatherDate>
        </WeatherInner>
        <LocationName>{name}</LocationName>
      </WeatherWrapper>
    </>
  );
};
const Alert = styled.div`
  width: 340px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(225, 225, 225, 0.795);
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  background-color: rgba(225, 225, 225, 0.362);
`;
const growAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;
const WeatherWrapper = styled.div`
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  background-color: rgba(225, 225, 225, 0.362);
  border-radius: 20px;
  box-shadow: 10px 10px 20px rgba(39, 39, 39, 0.6);
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(225, 225, 225, 0.45);
  }
`;
const WeatherImg = styled.img`
  width: 60px;
`;
const WeatherInner = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(225, 225, 225, 0.362);
  padding: 0px 20px 0 6px;
  border-radius: 20px 20px 0 0;
  // margin-top: 2px;
`;
const LocationName = styled.div`
  padding: 6px 0 12px;
  font-weight: 600;
`;
const WeatherDate = styled.div`
  margin: 0 0 0 10px;
`;
const DateBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -1px;
`;
const Timmer = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

export default Weather;
