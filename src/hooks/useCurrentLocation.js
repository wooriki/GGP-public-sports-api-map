import { useQuery } from 'react-query';

export const useCurrentLocation = () => {
  const options = {
    // 높은 정확도로 위치 정보를 가져올지 여부를 설정
    enableHighAccuracy: true,

    // 위치 정보를 가져오기까지 허용되는 시간을 설정하는 옵션
    // timeout: 1000 * 60 * 1, // 1 minute

    // 이전에 가져온 위치 정보가 얼마나 오래 사용될 수 있는지를 설정하는 옵션
    maximumAge: 1000 * 3600 * 24 // 24 hours
  };

  const getLocation = async () => {
    const position = await new Promise((resolve, reject) => {
      // getCurrentPosition : 브라우저의 Geolocation API의 메소드!!
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    const { latitude, longitude } = position.coords;
    return { latitude, longitude };
  };

  const { data: location, error } = useQuery('currentLocation', getLocation);

  return { location, error };
};