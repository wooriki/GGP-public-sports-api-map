import React, { useEffect, useState } from 'react';

export const useCurrentLocation = (
  options = {
    // 높은 정확도로 위치 정보를 가져올지 여부를 설정
    enableHighAccuracy: true,

    // 위치 정보를 가져오기까지 허용되는 시간을 설정하는 옵션
    // (1분으로 설정하여 이 시간 동안 가져오지 못하면 에러가 발생)
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)

    // 이전에 가져온 위치 정보가 얼마나 오래 사용될 수 있는지를 설정하는 옵션
    maximumAge: 1000 * 3600 * 24 // 24 hours
  }
) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // 위치 정보를 가져오는 성공 핸들러
    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    // 위치 정보를 가져오는 실패 핸들러
    const errorHandler = (error) => {
      setError(error.message);
    };

    // navigator 객체에서 geolocation 속성을 가져옴
    const { geolocation } = navigator;
    if (!geolocation) {
      setError('GeoLocation is not supported!');
      return;
    }
    // getCurrentPosition 함수를 사용하여 현재 위치 정보를 가져옴
    geolocation.getCurrentPosition(successHandler, errorHandler, options);
  }, [options]);

  return { location, error };
};