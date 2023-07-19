import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLocation } from '../../redux/modules/getCurrentLocation';

const useGetLocation = () => {
  const userLocation = useSelector((state) => {
    return [state.currentLocation.latitude, state.currentLocation.longitude];
  });
  const dispatch = useDispatch();

  useEffect(() => {
    findUserLocation(dispatch);
  }, []);

  return userLocation;
};

export default useGetLocation;

const findUserLocation = (dispatch) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(getCurrentLocation({ latitude, longitude }));
      },
      (error) => {
        console.error('위치 정보를 얻을 수 없습니다.', error);
      }
    );
  } else {
    console.error('Geolocation을 지원하지 않는 브라우저입니다.');
  }
};
