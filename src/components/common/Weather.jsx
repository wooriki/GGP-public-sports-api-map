import React from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { getWeatherData } from '../../axios/weatherApi';

export const Weather = () => {
  const { location, error } = useCurrentLocation();

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
        <h3>&nbsp;{`${hours}:${minutes}`}&nbsp;&nbsp;&nbsp;</h3>
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <LoadingBox>
        <Alert>Loading weather data...</Alert>
      </LoadingBox>
    );
  }

  if (isError) {
    return <div>Error occurred while fetching weather data</div>;
  }

  const { name, weather, main } = weatherData;

  return (
    <WeatherContainer>
      <WeatherWrapper>
        <WeatherInner>
          <WeatherImg src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather Icon" />{' '}
          <span>{`${main.temp}°C`}</span>
          <WeatherDate>{dateBuilder(new Date())}</WeatherDate>
        </WeatherInner>
        <LocationName>{name}</LocationName>
      </WeatherWrapper>
    </WeatherContainer>
  );
};

const LoadingBox = styled.div`
  position: relative;
`;

const Alert = styled.div`
  position: absolute;

  background-color: rgba(182, 182, 182, 0.25);
  border-radius: 20px;
  box-shadow: 10px 10px 10px rgba(70, 70, 70, 0.72);

  top: 40px;
  right: 30px;
  width: 344px;
  height: 90px;
  margin: 0 auto;
`;

const WeatherContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px 30px;
  border-radius: 20px;
`;
const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(182, 182, 182, 0.25);
  border-radius: 20px;
  box-shadow: 10px 10px 10px rgba(70, 70, 70, 0.72);
`;
const WeatherImg = styled.img`
  width: 50px;
`;
const WeatherInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(223, 223, 223, 0.488);
  padding: 0px 20px;
  border-radius: 20px 20px 0 0;
`;
const LocationName = styled.div`
  padding: 10px 0;
  font-weight: 600;
`;
const WeatherDate = styled.div`
  margin: 0 0 0 10px;
`;
const DateBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
