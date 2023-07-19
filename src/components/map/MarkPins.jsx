import React, { useEffect, useState } from 'react';
import { Marker, useNavermaps } from 'react-naver-maps';
import { useDispatch } from 'react-redux';
import { setBoundary } from '../../redux/modules/maps/setBoundary';

// 10개의 좌표(중복 가능)가 주어 졌을 때, 그 좌표들에 핀을 놓고
//좌표의 중간 지점으로 이동하여 모든 핀이 표시되도록 한다.
const MarkPins = () => {
  const dispatch = useDispatch();
  const navermaps = useNavermaps();
  const [coordsGroup, setCoordsGroup] = useState([]);
  useEffect(() => {
    // 아래는 가져온 10개의 랜덤 좌표, 실제로는 10개 가져오는 값에서 추출하여 가져올 예정
    setCoordsGroup([
      ...coordsGroup,
      { id: 0, longitude: 37.5201, latitude: 126.9501 },
      { id: 1, longitude: 37.5667, latitude: 126.9784 },
      { id: 2, longitude: 37.5567, latitude: 126.9884 },
      { id: 3, longitude: 37.5467, latitude: 126.9984 },
      { id: 4, longitude: 37.5367, latitude: 127.0052 },
      { id: 5, longitude: 37.5267, latitude: 127.0122 },
      { id: 6, longitude: 37.5301, latitude: 126.9522 },
      { id: 7, longitude: 37.5401, latitude: 126.9622 },
      { id: 8, longitude: 37.5451, latitude: 126.9822 },
      { id: 9, longitude: 37.5401, latitude: 127.0825 }
    ]);
  }, []);

  useEffect(() => {
    // coordsGroup 값이 변경되면 액션을 디스패치하여 Redux 스토어에 보낸다.
    dispatch(setBoundary(coordsGroup));
  }, [dispatch, coordsGroup]);
  return (
    <>
      {coordsGroup?.map((location) => (
        <Marker key={location.id} position={new navermaps.LatLng(+location.longitude, +location.latitude)} />
      ))}
    </>
  );
};

export default MarkPins;
