import React from "react";
import { styled } from "styled-components";
import { useQuery } from "react-query";

import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { positionOption } from "../../constants/positionOption";
import { getWeatherData } from "../../axios/weatherApi";

export const Weather = () => {
  const { location, error } = useCurrentLocation(positionOption);

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    // sunday 먼저..!!
    let days = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();
    return `${day} ${date} ${month} ${year}`;
  };

  const {
    data: weatherData,
    isLoading,
    isError,
  } = useQuery(
    ["weather", location],
    () => getWeatherData(location.latitude, location.longitude),
    {
      enabled: location !== null,
    }
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading weather data...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching weather data</div>;
  }

  const { name, weather, main } = weatherData;

  return (
    <StWeather>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
        alt="Weather Icon"
      />
      <span>{`${main.temp}°C`}</span>
      <p>{name}</p>
      <p>{dateBuilder(new Date())}</p>
    </StWeather>
  );
};

const StWeather = styled.div``;
