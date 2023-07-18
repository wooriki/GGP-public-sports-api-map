import React, { useEffect, useState } from "react";

// option을 받되, 빈 객체를 사용하도록 설정 => 매개변수를 생략하거나 값을 전달하지 않아도 기본값으로 설정
export const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  const successHandler = (position) => {
    // latitude: 위도 , longitude: 경도
    // coords : Geolocation API에서 제공하는 위치 정보 객체의 하위 속성
    //
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const errorHandler = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("GeoLocation is not supported!");
      return;
    }

    geolocation.getCurrentPosition(successHandler, errorHandler, options);
  }, [options]);

  return { location, error };
};
