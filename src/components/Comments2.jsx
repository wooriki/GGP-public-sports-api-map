import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const Comments2 = () => {
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log('현재 위도 경도는?', lat, lon);
    });
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=81523c3aa0ea13bf7e0d71967cd5d5d4`;
    let response = await fetch(url);
    let data = await response.json();
    console.log('데이터 확인!', data);
  };

  return <div>Comments2</div>;
};

export default Comments2;
