import React, { useCallback, useEffect, useState } from 'react';
import { styled, keyframes } from 'styled-components';
import { useQuery } from 'react-query';
import { getWeatherData } from '../../axios/weatherApi';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Weather = () => {
  const location = useSelector((state) => state.location);

  const [oneMinuteTimer, setOneMinuteTimer] = useState(0);
  const setTimer = useCallback(() => {
    setInterval(() => {
      setOneMinuteTimer(oneMinuteTimer + 1);
    }, 60000);
  }, [oneMinuteTimer]);

  const [koreanAddress, setKoreanAddress] = useState('서울특별시');
  useEffect(() => {
    const fetchKoreanCityName = async () => {
      const coords = `${location.longitude},${location.latitude}`;
      const res = (
        await axios('http://localhost:3001', {
          params: {
            coords
          }
        })
      ).data.results;
      setKoreanAddress(res[0].region.area3.name);
    };
    fetchKoreanCityName();
  }, [location]);

  const dateBuilder = useCallback(
    (d) => {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // sunday 먼저..!!
      let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Tur', 'Fri', 'Sat'];
      let day = days[d.getDay()];
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      let date = d.getDate();
      let hours = d.getHours().toString().padStart(2, '0');
      let minutes = d.getMinutes().toString().padStart(2, '0');
      setTimer();
      return (
        <DateBuild>
          <h3>{`${day} ${date} ${month} ${year}`}</h3>
          <Timmer>{`${hours}:${minutes}`}</Timmer>
        </DateBuild>
      );
    },
    [setTimer]
  );

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

  const { weather, main } = weatherData;
  // const currentDate = new Date();
  return (
    <>
      <WeatherWrapper>
        <WeatherInner>
          <WeatherDate>{dateBuilder(new Date())}</WeatherDate>
        </WeatherInner>
        <LocationName>
          <div id="header-weather-icon-container">
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather Icon" />
            <span>{`${main.temp.toFixed(1)}°C`}</span>
          </div>
          <h3>{koreanAddress}</h3>
        </LocationName>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border-radius: 20px;
  box-shadow: 1px 1px 5px 1px rgba(39, 39, 39, 0.6);
  overflow: hidden;

  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(225, 225, 225, 0.5);
  }
`;

const WeatherInner = styled.div`
  display: flex;
  width: 100%;
  gap: 0.4rem;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(225, 225, 225, 0.362);
`;
const LocationName = styled.div`
  color: #eee;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 8px;
  font-weight: 600;
  gap: 0.4rem;
  background-color: #77777799;
  h3 {
    margin-bottom: 1px;
    color: #eee;
  }

  #header-weather-icon-container {
    display: flex;
    align-items: center;

    img {
      width: 32px;
    }
    span {
      font-size: 0.85rem;
      font-weight: 600;
    }
  }
`;
const WeatherDate = styled.div`
  padding: 2px 15px;
  font-size: 0.9rem;
  color: #ddd;
  p {
    font-size: 1.2rem;
    color: #eee;
  }
`;
const DateBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3px;
`;
const Timmer = styled.p`
  font-weight: 600;
  font-size: 1.15rem;
`;

export default Weather;
