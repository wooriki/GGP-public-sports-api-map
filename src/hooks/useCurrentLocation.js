import { useQuery } from 'react-query';

export const useCurrentLocation = () => {
  const options = {
    // 높은 정확도로 위치 정보를 가져올지 여부를 설정
    enableHighAccuracy: true,

    // 위치 정보를 가져오기까지 허용되는 시간을 설정하는 옵션
    // timeout: 1000 * 60 * 1, // 1 minute
    // 이전에 가져온 위치 정보가 얼마나 오래 사용될 수 있는지를 설정하는 옵션
    maximumAge: 1000 * 3600 * 24
  };

  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      // getCurrentPosition : 브라우저의 Geolocation API의 메소드
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    })
      .then((position) => {
        const { latitude, longitude } = position.coords;
        return { latitude, longitude };
      })
      .catch((error) => {
        throw new Error(`Failed to get location: ${error.message}`);
      });
  };

  const { data: location, error, isLoading, isError } = useQuery('currentLocation', getLocation);

  if (isLoading) {
    return { location: null, error: null, isLoading, isError };
  }

  if (isError) {
    return { location: null, error: error.message, isLoading, isError };
  }

  return { location, error: null, isLoading, isError };
};
